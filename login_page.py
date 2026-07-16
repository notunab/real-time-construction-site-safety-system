import streamlit as st
from datetime import datetime
import time

st.set_page_config(
    page_title="ONGC Safety Ops - Login",
    layout="wide",
    initial_sidebar_state="collapsed",
)

# Hide header and footer
st.markdown("""
<style>
    [data-testid="stSidebar"] {display: none !important;}
    header {visibility: hidden !important;}
    footer {visibility: hidden !important;}
</style>
""", unsafe_allow_html=True)

if "logged_in" not in st.session_state:
    st.session_state.logged_in = False

# Create two equal columns
col_left, col_right = st.columns(2, gap="small")

# ==================== LEFT PANEL ====================
with col_left:
    # Logo Section
    col_logo, col_title = st.columns([0.4, 0.6])
    with col_logo:
        st.markdown("### 🏢")
    with col_title:
        st.markdown("### ONGC SAFETY OPS")
    
    st.divider()
    
    # Hero Title
    st.markdown("## Building a Safer Future")
    st.markdown("## Every Day.")
    
    st.write("")
    
    # Description
    st.write("AI-powered monitoring for real-time PPE detection, vehicle tracking, and site safety compliance.")
    
    st.write("")
    st.write("")
    
    # Features Grid
    feat_col1, feat_col2 = st.columns(2)
    
    with feat_col1:
        st.info("📷 Real-time Monitoring\n\nLive CCTV surveillance")
        st.info("📊 Violation & Penalty Tracking\n\nAuto alerts")
    
    with feat_col2:
        st.info("👷 PPE & Worker Detection\n\nHelmet & Vest check")
        st.info("🛡️ Safety Compliance\n\nReports")
    
    st.write("")
    st.write("")
    st.write("")
    
    # System Status
    st.success("✅ All Systems Operational")
    st.caption(f"Last updated: {datetime.now().strftime('%H:%M:%S IST')}")

# ==================== RIGHT PANEL ====================
with col_right:
    st.write("")
    st.write("")
    st.write("")
    
    # Centered Logo
    col_logo_r = st.columns(1)[0]
    with col_logo_r:
        col1, col2, col3 = st.columns([1, 2, 1])
        with col2:
            st.markdown("### 🏢")
    
    # Welcome Title
    st.markdown("<h2 style='text-align: center;'>Welcome <span style='color: #C41E3A;'>Back</span></h2>", unsafe_allow_html=True)
    st.markdown("<p style='text-align: center; color: gray;'>Sign in to your Control Room Dashboard</p>", unsafe_allow_html=True)
    
    st.write("")
    
    # Login Form
    with st.form("login_form"):
        st.write("**Email / Username**")
        username = st.text_input("", placeholder="Enter your email or username", label_visibility="collapsed")
        
        st.write("**Password**")
        password = st.text_input("", placeholder="Enter your password", type="password", label_visibility="collapsed")
        
        # Remember me and Forgot Password
        col_check, col_forgot = st.columns([1, 1])
        with col_check:
            remember = st.checkbox("Remember me")
        with col_forgot:
            st.markdown("<p style='text-align: right;'><a href='#' style='color: #C41E3A;'>Forgot Password?</a></p>", unsafe_allow_html=True)
        
        st.write("")
        
        # Login Button
        submit_btn = st.form_submit_button("🔒 LOGIN TO DASHBOARD", use_container_width=True)
        
        if submit_btn:
            if username == "admin" and password == "1234":
                st.session_state.logged_in = True
                st.session_state.username = username
                st.success("✅ Login successful! Redirecting...")
                time.sleep(1)
                st.rerun()
            elif username == "" or password == "":
                st.error("⚠️ Please enter both username and password")
            else:
                st.error("❌ Invalid username or password. Try admin/1234")
    
    st.write("")
    st.markdown("<p style='text-align: center;'>OR</p>", unsafe_allow_html=True)
    st.button("🔐 LOGIN WITH SSO", use_container_width=True, disabled=True)
    
    st.write("")
    
    # Security Box
    st.info("🛡️ **Secure Access**\n\nAll data is encrypted and securely transmitted")
    
    st.write("")
    
    # Help Section
    col_need, col_contact = st.columns([1, 1])
    with col_need:
        st.caption("Need help?")
    with col_contact:
        st.markdown("<p style='text-align: right;'><a href='#' style='color: #C41E3A;'>Contact System Administrator</a></p>", unsafe_allow_html=True)
    
    st.write("")
    st.write("")
    
    # Copyright
    st.caption("© 2026 ONGC Safety Ops. All rights reserved.")

# Redirect after login
if st.session_state.logged_in:
    st.switch_page("pages/dashboard.py")