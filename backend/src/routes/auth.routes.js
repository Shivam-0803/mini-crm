import express from 'express';
import passport from 'passport';
import { isAuthenticated } from '../middleware/auth.middleware.js';

const router = express.Router();

// Google OAuth routes
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: process.env.CORS_ORIGIN + '?auth_success=true',
    failureRedirect: process.env.CORS_ORIGIN + '/login?error=true'
  })
);

// Get current user
router.get('/me', isAuthenticated, (req, res) => {
  res.json({ user: req.user });
});

// Logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});

export default router; 