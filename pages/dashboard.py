import streamlit as st
import cv2
import time
from ultralytics import YOLO
from PIL import Image

# Set page config
st.set_page_config(
    page_title="ONGC Safety Dashboard",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Check if logged in
if "logged_in" not in st.session_state or not st.session_state.logged_in:
    st.warning("Please login first!")
    st.stop()

# Custom CSS
st.markdown("""
<style>
.stApp {
    background: #07111f;
    color: #ffffff;
}

.card {
    background: linear-gradient(145deg, #101c2d, #0b1726);
    border: 1px solid #223044;
    border-radius: 18px;
    padding: 18px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.35);
}

.kpi-card {
    height: 125px;
    display: flex;
    align-items: center;
    gap: 16px;
}

.kpi-value {
    font-size: 28px;
    font-weight: 800;
    color: white;
}

.green { color: #22c55e; font-weight: 700; }
.red { color: #ef4444; font-weight: 700; }
.amber { color: #f59e0b; font-weight: 700; }

section[data-testid="stSidebar"] {
    background: linear-gradient(180deg, #081526 0%, #06111e 100%);
    border-right: 1px solid #1f2f46;
}
</style>
""", unsafe_allow_html=True)

# Sidebar
with st.sidebar:
    st.markdown("## 👷 ONGC Safety Ops")
    st.markdown("---")
    
    menu = st.radio("Navigation", 
        ["🏠 Dashboard", "📹 Live Monitoring", "👷 Workers", "🔔 Alerts", "📄 Reports", "⚙️ Settings"],
        label_visibility="collapsed"
    )
    
    st.markdown("---")
    
    st.markdown("### System Status")
    st.markdown("🟢 **All Systems Operational**")
    st.markdown("📹 Cameras: **10/10 Online**")
    st.markdown("🤖 AI Detection: **Active**")
    st.markdown("🌐 Network: **Stable**")
    
    st.markdown("---")
    
    if st.button("🚪 Logout", use_container_width=True):
        st.session_state.logged_in = False
        st.rerun()

# Main Header
col1, col2 = st.columns([3, 1])
with col1:
    st.markdown("# 🏗️ Construction Safety Dashboard")
    st.markdown("Real-time Monitoring • AI Powered Detection • Worker Safety")

with col2:
    st.markdown("### 👤 " + st.session_state.username.upper())

st.markdown("---")

# KPI Cards
col1, col2, col3, col4, col5 = st.columns(5)

with col1:
    st.markdown('<div class="card kpi-card">', unsafe_allow_html=True)
    st.markdown("👥 **Total Workers**")
    st.markdown('<div class="kpi-value green">124</div>', unsafe_allow_html=True)
    st.markdown('</div>', unsafe_allow_html=True)

with col2:
    st.markdown('<div class="card kpi-card">', unsafe_allow_html=True)
    st.markdown("🛡️ **PPE Compliance**")
    st.markdown('<div class="kpi-value green">87%</div>', unsafe_allow_html=True)
    st.markdown('</div>', unsafe_allow_html=True)

with col3:
    st.markdown('<div class="card kpi-card">', unsafe_allow_html=True)
    st.markdown("⚠️ **Active Alerts**")
    st.markdown('<div class="kpi-value red">7</div>', unsafe_allow_html=True)
    st.markdown('</div>', unsafe_allow_html=True)

with col4:
    st.markdown('<div class="card kpi-card">', unsafe_allow_html=True)
    st.markdown("📹 **Cameras Online**")
    st.markdown('<div class="kpi-value green">10/10</div>', unsafe_allow_html=True)
    st.markdown('</div>', unsafe_allow_html=True)

with col5:
    st.markdown('<div class="card kpi-card">', unsafe_allow_html=True)
    st.markdown("✅ **Safety Score**")
    st.markdown('<div class="kpi-value green">92/100</div>', unsafe_allow_html=True)
    st.markdown('</div>', unsafe_allow_html=True)

st.markdown("---")

# Main Layout
left, middle, right = st.columns([2.4, 1.25, 1.45])

with left:
    st.markdown('<div class="card">', unsafe_allow_html=True)
    st.markdown("### 📹 Live Camera Feed <span class='green'>● LIVE</span>", unsafe_allow_html=True)
    
    # Load model
    try:
        model = YOLO("best.pt")
    except:
        st.warning("YOLO model not found. Please ensure 'best.pt' exists.")
        model = None
    
    camera_path = "demo/cam2.mp4"
    video_placeholder = st.empty()
    
    try:
        cap = cv2.VideoCapture(camera_path)
        
        if cap.isOpened():
            frame_count = 0
            while frame_count < 100:  # Limit frames for demo
                ret, frame = cap.read()
                
                if not ret:
                    break
                
                frame = cv2.resize(frame, (480, 270))
                
                if model:
                    results = model(frame)
                    annotated_frame = results[0].plot()
                else:
                    annotated_frame = frame
                
                annotated_frame = cv2.cvtColor(annotated_frame, cv2.COLOR_BGR2RGB)
                
                video_placeholder.image(annotated_frame, channels="RGB", use_container_width=True)
                frame_count += 1
                time.sleep(0.03)
        else:
            st.error("❌ Camera feed not found")
        
        cap.release()
    except Exception as e:
        st.error(f"Error loading video: {e}")
    
    st.markdown("</div>", unsafe_allow_html=True)

with middle:
    st.markdown('<div class="card">', unsafe_allow_html=True)
    st.markdown("### Detection Summary")
    st.markdown('<div style="color:#22c55e;">🟢 Helmets Detected: **104**</div>', unsafe_allow_html=True)
    st.markdown('<div style="color:#ef4444;">🔴 No Helmets: **20**</div>', unsafe_allow_html=True)
    st.markdown('<div style="color:#22c55e;">🟢 Vests Detected: **98**</div>', unsafe_allow_html=True)
    st.markdown('<div style="color:#ef4444;">🔴 No Vests: **26**</div>', unsafe_allow_html=True)
    st.markdown("</div>", unsafe_allow_html=True)
    
    st.markdown('<div class="card">', unsafe_allow_html=True)
    st.markdown("### PPE Compliance Overview")
    st.markdown('<div style="font-size:52px;font-weight:900;text-align:center;color:#22c55e;">87%</div>', unsafe_allow_html=True)
    st.markdown("Compliant", unsafe_allow_html=True)
    st.markdown("</div>", unsafe_allow_html=True)

with right:
    st.markdown('<div class="card">', unsafe_allow_html=True)
    st.markdown("### 🏗️ Site Overview")
    st.markdown("---")
    st.markdown("👷 **Total Workers**: <span style='color:#22c55e;float:right;'>124</span>", unsafe_allow_html=True)
    st.markdown("🛡️ **PPE Compliance**: <span style='color:#22c55e;float:right;'>87%</span>", unsafe_allow_html=True)
    st.markdown("📹 **Active Cameras**: <span style='color:#22c55e;float:right;'>10/10</span>", unsafe_allow_html=True)
    st.markdown("🚨 **Today's Violations**: <span style='color:#ef4444;float:right;'>7</span>", unsafe_allow_html=True)
    st.markdown("⚠️ **Warnings Issued**: <span style='color:#f59e0b;float:right;'>5</span>", unsafe_allow_html=True)
    st.markdown("🔨 **Penalties**: <span style='color:#ef4444;float:right;'>2</span>", unsafe_allow_html=True)
    st.markdown("</div>", unsafe_allow_html=True)
    
    st.markdown('<div class="card">', unsafe_allow_html=True)
    st.markdown("### 🔔 Recent Alerts")
    st.markdown("🚨 **No Helmet Detected** - Camera 03 (East Zone)")
    st.markdown("⚠️ **No Safety Vest** - Camera 05 (Material Area)")
    st.markdown("🚨 **Multiple Violations** - Camera 02 (Scaffolding)")
    st.markdown("</div>", unsafe_allow_html=True)