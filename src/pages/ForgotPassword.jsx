import { useState, useEffect, useLayoutEffect } from 'react';
import { sendPasswordReset } from '../firebase';
import AppHelmet from '../components/AppHelmet';
import { NavLink } from 'react-router-dom';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [sending, setSending] = useState(false);

    useEffect(() => {
        error && setTimeout(() => setError(null), 4000);
        success && setTimeout(() => setSuccess(null), 4000);
    }, [error, success]);

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSending(true);
        sendPasswordReset(email, setSuccess, setError, () => setSending(false));
    };

    return (
        <div className="login">
            <AppHelmet title="Forgot Password" location="/forgot-password" />
            <form onSubmit={handleSubmit}>
                <h2>Reset Password</h2>
                <p style={{ color: 'var(--grey-400)', fontSize: 'var(--text-sm)', textAlign: 'center' }}>
                    Enter your email and we will send you a reset link.
                </p>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    disabled={sending}
                />
                <button type="submit" className="btn" disabled={sending}>
                    {sending ? 'Sending...' : 'Send Reset Link'}
                </button>
                {error && <span className="error">{error}</span>}
                {success && <span className="success" style={{ color: 'var(--green-500)', fontSize: 'var(--text-sm)', textAlign: 'center' }}>{success}</span>}
                <div className="text">
                    Remember your password?&emsp;|&emsp;<NavLink to="/login">Login &raquo;</NavLink>
                </div>
            </form>
        </div>
    );
}
