import React from "react";

const Footer: React.FC = () => {
    return (
        <footer
            style={{
                position: 'fixed',
                left: 0,
                bottom: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#f8f8f8',
                borderTop: '1px solid #eee',
                height: '4rem',
                width: '100%',
                zIndex: 1000,
            }}
        >
            <p>© 2025 키플리. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
