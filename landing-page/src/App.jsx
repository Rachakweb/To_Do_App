import React from 'react';
import { Download, CheckCircle, Zap, Shield, Smartphone, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ y: -10 }}
    className="glass-card"
  >
    <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}>
      <Icon size={32} />
    </div>
    <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>{title}</h3>
    <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>{description}</p>
  </motion.div>
);

function App() {
  return (
    <div style={{ paddingBottom: '5rem' }}>
      {/* Navbar */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '2rem 0',
        marginBottom: '4rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <img src="/logo.png" alt="Logo" style={{ width: '50px', height: '50px', borderRadius: '12px', objectFit: 'contain' }} />
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Aura TO-DO</span>
        </div>
        <a href="#download" className="btn-primary" style={{ padding: '8px 24px', fontSize: '0.9rem' }}>
          Get App
        </a>
      </nav>

      {/* Hero Section */}
      <header style={{
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto 8rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span style={{
            color: 'var(--primary)',
            fontSize: '0.9rem',
            fontWeight: '600',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '1rem',
            display: 'block'
          }}>By Rak Studio</span>
          <img
            src="/logo.png"
            alt="Aura TO-DO Logo"
            style={{
              width: '120px',
              height: '120px',
              margin: '0 auto 2rem',
              borderRadius: '24px',
              boxShadow: '0 0 30px rgba(167, 139, 250, 0.3)'
            }}
          />
          <h1 className="section-title">Aura TO-DO</h1>
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem', background: 'linear-gradient(to right, #fff, var(--text-dim))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Master Your Day with Minimalist Focus</h2>
          <p style={{
            fontSize: '1.25rem',
            color: 'var(--text-dim)',
            marginBottom: '2.5rem',
            lineHeight: '1.6'
          }}>
            Aura To-Do combines elegance with peak productivity. Track tasks, manage goals, and stay organized with a premium experience designed for focus.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <a href="#download" className="btn-primary">
              <Download size={20} /> Download APK
            </a>
            <a href="https://aura-todo.vercel.app" target="_blank" className="btn-primary" style={{ background: 'transparent', color: '#fff', border: '1px solid var(--border)', boxShadow: 'none' }}>
              Try Web Demo <ArrowRight size={20} />
            </a>
          </div>
        </motion.div>
      </header>

      {/* App Preview Mockup */}
      <section style={{ marginBottom: '10rem', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            position: 'relative',
            borderRadius: '32px',
            overflow: 'hidden',
            border: '1px solid var(--border)',
            background: 'linear-gradient(135deg, #1e1e26 0%, #0F0F12 100%)',
            aspectRatio: '16/9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <Smartphone size={100} color="var(--primary)" style={{ marginBottom: '1rem' }} />
            <p style={{ fontWeight: '500' }}>App Preview Coming Soon</p>
          </div>
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--glass)',
            padding: '10px 20px',
            borderRadius: '100px',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--border)',
            fontSize: '0.8rem',
            color: 'var(--text-dim)'
          }}>
            Handcrafted for Android & iOS
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section style={{ marginBottom: '10rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '4rem', fontSize: '2.5rem' }}>Features designed for elite productivity</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          <FeatureCard
            icon={Zap}
            title="Lightning Fast"
            description="Native performance ensures your task management is as quick as your thoughts."
          />
          <FeatureCard
            icon={Shield}
            title="Secure & Private"
            description="Your data stays locally on your device or in your secure cloud. Your privacy is priority."
          />
          <FeatureCard
            icon={CheckCircle}
            title="Intuitive Design"
            description="A minimalist interface that clears the mental clutter and focuses on what matters."
          />
        </div>
      </section>

      {/* Download Section */}
      <section id="download" style={{
        textAlign: 'center',
        padding: '5rem 2rem',
        background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.1) 0%, transparent 100%)',
        borderRadius: '32px',
        border: '1px solid var(--primary)',
        boxShadow: '0 0 50px rgba(167, 139, 250, 0.05)'
      }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Ready to elevate your life?</h2>
        <p style={{ marginBottom: '3rem', color: 'var(--text-dim)', fontSize: '1.2rem' }}>
          Download Aura To-Do now and join thousands of users mastering their time.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center' }}>
            <a href="https://expo.dev/artifacts/eas/iuggDhDYwynZMxhrt9qeEq.apk" className="btn-primary" style={{ fontSize: '1.1rem', padding: '16px 48px' }}>
              <Download size={24} /> Download APK (Direct)
            </a>
            <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-dim)' }}>Version 1.1.0 • Aura TO-DO</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ marginTop: '8rem', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.9rem' }}>
        <p>© 2026 Rak Studio. All rights reserved.</p>
        <div style={{ marginTop: '1rem', display: 'flex', gap: '2rem', justifyContent: 'center' }}>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Support</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
