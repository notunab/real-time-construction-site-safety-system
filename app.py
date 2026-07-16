import base64
import cv2
import tempfile
import time
import os
import streamlit as st
from ultralytics import YOLO
from PIL import Image

st.set_page_config(
    page_title="Construction Safety System",
    layout="wide",
    initial_sidebar_state="expanded"
)
# ---------------- SESSION VARIABLES ----------------
if "logged_in" not in st.session_state:
    st.session_state.logged_in = False

# ---------------- LOGIN STATE ----------------
if "logged_in" not in st.session_state:
    st.session_state.logged_in = False

# ---------------- CSS ----------------
st.markdown("""
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');

* {
    font-family: 'Inter', sans-serif;
}

.stApp {
    background: #07111f;
    color: #ffffff;
}

.block-container {
    padding-top: 2.8rem;
    padding-left: 1.8rem;
    padding-right: 1.8rem;
    max-width: 100%;
}

section[data-testid="stSidebar"] {
    background: linear-gradient(180deg, #081526 0%, #06111e 100%);
    border-right: 1px solid #1f2f46;
}

.card {
    background: linear-gradient(145deg, #101c2d, #0b1726);
    border: 1px solid #223044;
    border-radius: 18px;
    padding: 18px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.35);
}

.login-box {
    max-width: 430px;
    margin: 90px auto;
    padding: 35px;
    background: linear-gradient(145deg, #101c2d, #0b1726);
    border: 1px solid #223044;
    border-radius: 22px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.45);
}

.login-title {
    font-size: 34px;
    font-weight: 900;
    text-align: center;
}

.login-subtitle {
    color: #9ca3af;
    text-align: center;
    margin-bottom: 25px;
}

.kpi-card {
    height: 125px;
    display: flex;
    align-items: center;
    gap: 16px;
}

.icon-box {
    width: 64px;
    height: 64px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
}

.blue-icon { background: linear-gradient(135deg, #0f5bd8, #07306f); }
.green-icon { background: linear-gradient(135deg, #16a34a, #064e3b); }
.amber-icon { background: linear-gradient(135deg, #f59e0b, #78350f); }
.purple-icon { background: linear-gradient(135deg, #8b5cf6, #4c1d95); }

.kpi-title {
    color: #b6c2d2;
    font-size: 14px;
    margin-bottom: 5px;
}

.kpi-value {
    font-size: 28px;
    font-weight: 800;
    color: white;
}

.small-text {
    color: #9ca3af;
    font-size: 13px;
}

.green { color: #22c55e; font-weight: 700; }
.red { color: #ef4444; font-weight: 700; }
.amber { color: #f59e0b; font-weight: 700; }
.blue { color: #3b82f6; font-weight: 700; }

.logo {
    display: flex;
    gap: 12px;
    align-items: center;
    margin-bottom: 25px;
}

.logo-icon {
    font-size: 38px;
}

.logo-text {
    font-size: 26px;
    font-weight: 900;
    line-height: 1.05;
}

.logo-text span {
    color: #fbbf24;
}

.menu-item {
    padding: 13px 15px;
    margin-bottom: 10px;
    border-radius: 12px;
    color: #dbeafe;
    font-weight: 700;
}

.menu-active {
    background: linear-gradient(90deg, #1d4ed8, #2563eb);
    color: white;
}

.header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 18px;
}

.title {
    font-size: 34px;
    font-weight: 900;
    margin-bottom: 5px;
}

.subtitle {
    color: #aab7c8;
    font-size: 16px;
}

.top-widget {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    background: #101c2d;
    border: 1px solid #223044;
    border-radius: 14px;
    padding: 12px 18px;
    margin-left: 10px;
    min-width: 130px;
}

.camera-placeholder {
    height: 420px;
    background: linear-gradient(135deg, #111827, #020617);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #94a3b8;
    font-size: 18px;
    border: 1px dashed #334155;
}

.cam-card {
    background: #0e1b2c;
    border: 1px solid #23344d;
    border-radius: 14px;
    padding: 10px;
    text-align: center;
}

.worker-row, .alert-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 11px 0;
    border-bottom: 1px solid #1f2f46;
}

.avatar {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: #1e293b;
    display: flex;
    align-items: center;
    justify-content: center;
}

.action-card {
    background: linear-gradient(145deg, #0f1d32, #0b1726);
    border: 1px solid #223044;
    border-radius: 16px;
    padding: 18px;
    display: flex;
    gap: 15px;
    align-items: center;
    min-height: 80px;
}

.action-icon {
    font-size: 30px;
}

.stButton button {
    width: 100%;
    border-radius: 12px;
    border: 1px solid #2f4563;
    background: #0f1d32;
    color: white;
    font-weight: 700;
    padding: 10px;
}

.stButton button:hover {
    border-color: #3b82f6;
    color: #60a5fa;
}

[data-testid="stFileUploader"] {
    background: #0f1d32;
    border: 1px dashed #334155;
    border-radius: 14px;
    padding: 12px;
}
</style>
""", unsafe_allow_html=True)

# ---------------- LOGIN PAGE ----------------
if not st.session_state.logged_in:

    def img_to_base64(path):
        with open(path, "rb") as file:
            return base64.b64encode(file.read()).decode()

    bg_img = img_to_base64("login_bg.png")

    st.markdown(f"""
    <style>
    section[data-testid="stSidebar"] {{
        display: none;
    }}

    header {{
        visibility: visible;
    }}

    .stApp {{
        background-image:
        linear-gradient(rgba(2, 10, 20, 0.68), rgba(2, 10, 20, 0.82)),
        url("data:image/png;base64,{bg_img}");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }}

    .block-container {{
        max-width: 1020px !important;
        margin-top: 280px !important;
        margin-left: -80px !important;
        padding: 80px 95px !important;
        border-radius: 54px !important;
        background: rgba(5, 18, 35, 0.78) !important;
        border: 1.5px solid rgba(80, 150, 230, 0.85) !important;
        box-shadow:
            0 0 25px rgba(37,128,255,0.35),
            0 0 80px rgba(37,128,255,0.18),
            0 30px 80px rgba(0,0,0,0.75) !important;
        backdrop-filter: blur(25px) !important;
    }}

    /* ---- LOGO: bigger + spread across the top ---- */
    .login-logo {{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 30px;
        width: 100%;
        margin-bottom: 10px;
    }}

    .helmet-icon {{
        width: 170px;
        height: 170px;
        border-radius: 32px;
        background: linear-gradient(145deg, #12345a, #071827);
        border: 1px solid #2f6eb3;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 84px;
        flex-shrink: 0;
        box-shadow: 0 0 30px rgba(37,128,255,0.35);
    }}

    .login-main-title {{
        font-size: 100px;
        font-weight: 1000;
        line-height: 1;
        color: white;
        white-space: nowrap;
    }}

    .login-main-title span {{
        color: #fbbf24;
    }}

    .login-subtitle {{
        text-align: center;
        color: #a7bad6;
        font-size: 22px;
        margin-bottom: 28px;
    }}

    .secure-row {{
        display: flex;
        align-items: center;
        gap: 16px;
        color: #a7bad6;
        font-size: 28px;
        font-weight: 700;
        margin-bottom: 28px;
    }}

    .secure-row::before,
    .secure-row::after {{
        content: "";
        flex: 1;
        height: 10px;
        background: #29415f;
    }}

    div[data-testid="stTextInput"] label {{
        color: white !important;
        font-size: 1000px !important;
        font-weight: 800 !important;
    }}

    /* ---- INPUT BOXES: fixed contrast so text is actually readable ---- */

    /* Streamlit wraps the real <input> in a BaseWeb container div.
       That outer div is what actually shows the border/box you see on
       screen, and by default it turns red on focus. We style THAT
       container, and make the inner input itself fully transparent
       so there's no double-box or mismatched color. */
    div[data-testid="stTextInput"] div[data-baseweb="base-input"] {{
        background: #0d1c2f !important;
        border: 1.5px solid #4d7ea3 !important;
        border-radius: 22px !important;
        box-shadow: none !important;
        height: 400px !important;
        display: flex !important;
        align-items: center !important;
    }}

    div[data-testid="stTextInput"] div[data-baseweb="base-input"]:focus-within {{
        border: 1.5px solid #2580ff !important;
        box-shadow: 0 0 0 3px rgba(37,128,255,0.25) !important;
    }}

    div[data-testid="stTextInput"] input {{
        height: 300% !important;
        background: transparent !important;
        color: #ffffff !important;
        caret-color: #ffffff !important;
        border: none !important;
        box-shadow: none !important;
        outline: none !important;
        font-size: 30px !important;
        font-weight: 600 !important;
        padding: 0 20px !important;
    }}

    div[data-testid="stTextInput"] input::placeholder {{
        color: #8fa5c2 !important;
        opacity: 1 !important;
        font-weight: 400 !important;
    }}

    .stCheckbox label {{
        color: white !important;
    }}

    .stButton button {{
        width: 1000%;
        height: 68px;
        border-radius: 13px;
        background: linear-gradient(90deg, #0f6fff, #005be8);
        border: 1px solid #2580ff;
        color: white;
        font-size: 22px;
        font-weight: 900;
        margin-top: 12px;
    }}

    .bottom-text {{
        text-align: center;
        color: #a7bad6;
        font-size: 18px;
        font-weight: 700;
        margin-top: 30px;
        border-top: 1px solid #29415f;
        padding-top: 26px;
    }}
    </style>
    """, unsafe_allow_html=True)

    st.markdown("""
    <div class="login-logo">
        <div class="helmet-icon">👷</div>
        <div class="login-main-title">
        SAFETY <span>NET</span>
        </div>
    </div>

    <div class="login-subtitle">Construction Safety System</div>

    <div class="secure-row">🛡 Secure Login to Continue</div>
    """, unsafe_allow_html=True)

    username = st.text_input("Username", placeholder="Enter your username")
    password = st.text_input("Password", type="password", placeholder="Enter your password")

    remember = st.checkbox("Remember me")

    if st.button("🔒 Login"):
        if username == "admin" and password == "1234":
            st.session_state.logged_in = True
            st.rerun()
        else:
            st.error("Invalid username or password")

    st.markdown("""
    <div class="bottom-text">🛡 Your Safety, Our Priority</div>
    """, unsafe_allow_html=True)

    st.stop()

# ---------------- MODEL ----------------
model = YOLO("best.pt")

# ---------------- Sidebar ----------------
with st.sidebar:
    st.markdown("""
    <div class="logo">
        <div class="logo-icon">👷</div>
        <div class="logo-text">SAFETY<br><span>GUARD</span></div>
    </div>
    <p class="small-text">Construction Safety System</p>
    """, unsafe_allow_html=True)

    st.markdown('<div class="menu-item menu-active">▦ Dashboard</div>', unsafe_allow_html=True)
    st.markdown('<div class="menu-item">📹 Live Monitoring</div>', unsafe_allow_html=True)
    st.markdown('<div class="menu-item">👷 Workers</div>', unsafe_allow_html=True)
    st.markdown('<div class="menu-item">🔔 Alerts <span class="red">● 7</span></div>', unsafe_allow_html=True)
    st.markdown('<div class="menu-item">📄 Reports</div>', unsafe_allow_html=True)
    st.markdown('<div class="menu-item">🛡 PPE Compliance</div>', unsafe_allow_html=True)
    st.markdown('<div class="menu-item">⚙ Settings</div>', unsafe_allow_html=True)

    st.markdown("<br>", unsafe_allow_html=True)

    st.markdown("""
    <div class="card">
        <h4>System Status</h4>
        <p class="green">● All Systems Operational</p>
        <p>📹 Cameras <span class="green">10 / 10 Online</span></p>
        <p>🤖 AI Detection <span class="green">Active</span></p>
        <p>🌐 Network <span class="green">Stable</span></p>
        <p>💾 Storage <span class="amber">72% Used</span></p>
    </div>
    """, unsafe_allow_html=True)

    st.markdown("<br>", unsafe_allow_html=True)

    st.markdown("""
    <div class="card">
        <b>SM &nbsp; Site Manager</b><br>
        <span class="green">● Online</span>
    </div>
    """, unsafe_allow_html=True)

    if st.button("Logout"):
        st.session_state.logged_in = False
        st.rerun()

# ---------------- Header ----------------
st.markdown("""
<div class="header-row">
    <div>
        <div class="title">Construction Site Safety System</div>
        <div class="subtitle">Real-time Monitoring • AI Powered Detection • Worker Safety</div>
    </div>
    <div>
        <span class="top-widget">🌤️ <b>32°C</b><br><span class="small-text">Partly Cloudy</span></span>
        <span class="top-widget">🕒 <b>10:30 AM</b><br><span class="small-text">01 Jul 2026</span></span>
        <span class="top-widget">🔔 <b class="red">7</b><br><span class="small-text">Alerts</span></span>
        <span class="top-widget">👤 <b>Admin</b><br><span class="small-text">Logged In</span></span>
    </div>
</div>
""", unsafe_allow_html=True)

# ---------------- KPI Cards ----------------
k1, k2, k3, k4, k5 = st.columns(5)

kpi_data = [
    ("👥", "Total Workers", "124", "↑ 12%", "vs yesterday", "blue-icon", "green"),
    ("🛡", "PPE Compliance", "87%", "↑ 5%", "vs yesterday", "green-icon", "green"),
    ("⚠️", "Active Alerts", "7", "↑ 2", "vs yesterday", "amber-icon", "red"),
    ("📹", "Cameras Online", "10 / 10", "Online", "All Systems", "purple-icon", "green"),
    ("✅", "Site Safety Score", "92 / 100", "Excellent", "↑ 8%", "green-icon", "green"),
]

for col, item in zip([k1, k2, k3, k4, k5], kpi_data):
    icon, title, value, trend, sub, icon_class, color = item
    with col:
        st.markdown(f"""
        <div class="card kpi-card">
            <div class="icon-box {icon_class}">{icon}</div>
            <div>
                <div class="kpi-title">{title}</div>
                <div class="kpi-value">{value}</div>
                <span class="{color}">{trend}</span>
                <span class="small-text"> {sub}</span>
            </div>
        </div>
        """, unsafe_allow_html=True)

# ---------------- Detection variables ----------------
helmet_count = 104
no_helmet_count = 20
vest_count = 98
no_vest_count = 26
person_count = 124

# ---------------- Main Layout ----------------
left, middle, right = st.columns([2.4, 1.25, 1.45])

with left:
    st.markdown('<div class="card">', unsafe_allow_html=True)
    st.markdown("### Live Camera Feed  <span class='green'>LIVE</span>", unsafe_allow_html=True)
    
    camera_path = "demo/cam2.mp4"
    video_placeholder = st.empty()
    cap = cv2.VideoCapture(camera_path)

    if cap.isOpened():
        fps = int(cap.get(cv2.CAP_PROP_FPS))
        
        while True:
            ret, frame = cap.read()
            
            if not ret:
                cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
                continue
            
            # Aggressive optimization
            # Resize frame
            frame = cv2.resize(frame, (480, 270))

            # Run YOLO detection
            results = model(frame)
            print(results[0].boxes)
            print(results[0].names)

            # Draw bounding boxes
            annotated_frame = results[0].plot()

            # Convert BGR to RGB for Streamlit
            annotated_frame = cv2.cvtColor(annotated_frame, cv2.COLOR_BGR2RGB)

            # Display
            video_placeholder.image(
                annotated_frame,
                channels="RGB",
                use_container_width=True
            )
            
            # No sleep - play as fast as possible
            # time.sleep(frame_delay)
    else:
        st.error("Camera not found.")

    cap.release()
    st.markdown("</div>", unsafe_allow_html=True)

cam1, cam2, cam3, cam4, cam5 = st.columns(5, gap="medium")

for cam, name, loc in [
    (cam1, "Cam 01", "Main Gate"),
    (cam2, "Cam 02", "Scaffolding"),
    (cam3, "Cam 03", "East Zone"),
    (cam4, "Cam 04", "West Zone"),
    (cam5, "+6", "More Cameras"),
]:
    with cam:
        st.markdown(f"""
        <div class="cam-card">
            <b>{name}</b><br>
            <span class="small-text">{loc}</span><br>
            <span class="green">●</span>
        </div>
        """, unsafe_allow_html=True)

st.markdown("</div>", unsafe_allow_html=True)

with middle:
    st.markdown(f"""
    <div class="card">
        <h3>Detection Summary</h3>
        <div class="card">
            <span class="green">🟢 Helmets Detected</span>
            <div class="kpi-value">{helmet_count}</div>
        </div>
        <div class="card">
            <span class="red">🔴 No Helmets</span>
            <div class="kpi-value">{no_helmet_count}</div>
        </div>
        <div class="card">
            <span class="green">🟢 Vests Detected</span>
            <div class="kpi-value">{vest_count}</div>
        </div>
        <div class="card">
            <span class="red">🔴 No Vests</span>
            <div class="kpi-value">{no_vest_count}</div>
        </div>
    </div>
    """, unsafe_allow_html=True)

    st.markdown(f"""
    <div class="card">
        <h3>PPE Compliance Overview</h3>
        <div style="font-size:52px;font-weight:900;text-align:center;" class="green">87%</div>
        <p style="text-align:center;">Compliant</p>
        <p><span class="green">■</span> Compliant &nbsp;&nbsp; 87%</p>
        <p><span class="red">■</span> No Helmet &nbsp;&nbsp; {no_helmet_count}</p>
        <p><span class="amber">■</span> No Vest &nbsp;&nbsp; {no_vest_count}</p>
        <p><span style="color:#8b5cf6;">■</span> Both Missing &nbsp;&nbsp; 2%</p>
    </div>
    """, unsafe_allow_html=True)

with right:
    st.markdown("""
        <div class="card">

        <h3>🏗 Site Overview</h3>

        <hr style="border:1px solid #1f2f46;">

        <p>👷 <b>Total Workers</b>
        <span style="float:right;color:#22c55e;">124</span></p>

        <p>🛡 <b>PPE Compliance</b>
        <span style="float:right;color:#22c55e;">87%</span></p>

        <p>📹 <b>Active Cameras</b>
        <span style="float:right;color:#22c55e;">10 / 10</span></p>

        <p>🚨 <b>Today's Violations</b>
        <span style="float:right;color:#ef4444;">7</span></p>

        <p>⚠ <b>Warnings Issued</b>
        <span style="float:right;color:#f59e0b;">5</span></p>

        <p>🔨 <b>Penalties</b>
        <span style="float:right;color:#ef4444;">2</span></p>

        </div>
        """, unsafe_allow_html=True)

    st.markdown("""
    <div class="card">
        <h3>Recent Alerts <span class="blue" style="float:right;">View All</span></h3>
        <div class="alert-row"><div class="avatar">🚨</div><div><b class="red">No Helmet Detected</b><br><span class="small-text">Camera 03 - East Zone</span></div></div>
        <div class="alert-row"><div class="avatar">⚠️</div><div><b class="amber">No Safety Vest</b><br><span class="small-text">Camera 05 - Material Area</span></div></div>
        <div class="alert-row"><div class="avatar">🚨</div><div><b class="red">Multiple Violations</b><br><span class="small-text">Camera 02 - Scaffolding</span></div></div>
        <div class="alert-row"><div class="avatar">⚠️</div><div><b class="amber">Restricted Area Entry</b><br><span class="small-text">Camera 07 - Zone B</span></div></div>
    </div>
    """, unsafe_allow_html=True)

# ---------------- Quick Actions ----------------
st.markdown("### Quick Actions")

a1, a2, a3, a4 = st.columns(4)

with a1:
    st.markdown("""
    <div class="action-card">
        <div class="action-icon blue">📢</div>
        <div><b class="blue">Send Warning</b><br><span class="small-text">To Worker</span></div>
    </div>
    """, unsafe_allow_html=True)

with a2:
    st.markdown("""
    <div class="action-card">
        <div class="action-icon amber">🔨</div>
        <div><b class="amber">Send Penalty</b><br><span class="small-text">To Worker</span></div>
    </div>
    """, unsafe_allow_html=True)

with a3:
    st.markdown("""
    <div class="action-card">
        <div class="action-icon" style="color:#8b5cf6;">🚨</div>
        <div><b style="color:#a78bfa;">Emergency Alert</b><br><span class="small-text">All Workers</span></div>
    </div>
    """, unsafe_allow_html=True)

with a4:
    st.markdown("""
    <div class="action-card">
        <div class="action-icon blue">📄</div>
        <div><b class="blue">Generate Report</b><br><span class="small-text">Download PDF</span></div>
    </div>
    """, unsafe_allow_html=True)