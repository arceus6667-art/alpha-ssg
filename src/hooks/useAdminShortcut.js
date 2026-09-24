import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Secret Admin Shortcut Listener: CTRL + SHIFT + A (or CMD + SHIFT + A)
 * Opens the Admin Login route when triggered on any public page.
 */
export function useAdminShortcut() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check for Ctrl + Shift + A (Windows/Linux) or Cmd + Shift + A (macOS)
      const isModifierPressed = event.ctrlKey || event.metaKey;
      const isShiftPressed = event.shiftKey;
      const isAKey = event.key === 'A' || event.key === 'a' || event.code === 'KeyA';

      if (isModifierPressed && isShiftPressed && isAKey) {
        event.preventDefault();
        navigate('/admin/login');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);
}

export default useAdminShortcut;
