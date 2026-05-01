/**
 * Services Popover Tests
 * Basic tests to ensure the popover works correctly
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ServicesPopover } from '../services-popover';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/ar',
}));

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href, onClick, ...props }: any) => (
    <a href={href} onClick={onClick} {...props}>
      {children}
    </a>
  ),
}));

describe('ServicesPopover', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Desktop Popover', () => {
    it('should render the trigger button', () => {
      render(<ServicesPopover locale="ar" />);
      const button = screen.getByRole('button', { name: /خدماتنا/i });
      expect(button).toBeInTheDocument();
    });

    it('should open popover when trigger is clicked', async () => {
      render(<ServicesPopover locale="ar" />);
      const button = screen.getByRole('button', { name: /خدماتنا/i });
      
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    });

    it('should display all 6 services', async () => {
      render(<ServicesPopover locale="ar" />);
      const button = screen.getByRole('button', { name: /خدماتنا/i });
      
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(screen.getByText('حجز موعد مع طبيب')).toBeInTheDocument();
        expect(screen.getByText('استشارة عاجلة')).toBeInTheDocument();
        expect(screen.getByText('اسأل طبيب')).toBeInTheDocument();
        expect(screen.getByText('الشبكة الطبية')).toBeInTheDocument();
        expect(screen.getByText('الشبكة الصحية')).toBeInTheDocument();
        expect(screen.getByText('الرعاية المنزلية')).toBeInTheDocument();
      });
    });

    it('should close popover when clicking outside', async () => {
      render(<ServicesPopover locale="ar" />);
      const button = screen.getByRole('button', { name: /خدماتنا/i });
      
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
      
      // Click outside
      fireEvent.mouseDown(document.body);
      
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    it('should close popover when pressing Escape', async () => {
      render(<ServicesPopover locale="ar" />);
      const button = screen.getByRole('button', { name: /خدماتنا/i });
      
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
      
      // Press Escape
      fireEvent.keyDown(document, { key: 'Escape' });
      
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    it('should have correct ARIA attributes', () => {
      render(<ServicesPopover locale="ar" />);
      const button = screen.getByRole('button', { name: /خدماتنا/i });
      
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(button).toHaveAttribute('aria-haspopup', 'true');
      
      fireEvent.click(button);
      
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('should display "View All Services" link', async () => {
      render(<ServicesPopover locale="ar" />);
      const button = screen.getByRole('button', { name: /خدماتنا/i });
      
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(screen.getByText(/عرض جميع الخدمات/i)).toBeInTheDocument();
      });
    });
  });

  describe('Mobile Bottom Sheet', () => {
    it('should render mobile trigger button', () => {
      render(<ServicesPopover locale="ar" isMobile />);
      const button = screen.getByRole('button', { name: /خدماتنا/i });
      expect(button).toBeInTheDocument();
    });

    it('should open bottom sheet when clicked', async () => {
      render(<ServicesPopover locale="ar" isMobile />);
      const button = screen.getByRole('button', { name: /خدماتنا/i });
      
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    });

    it('should display close button in mobile', async () => {
      render(<ServicesPopover locale="ar" isMobile />);
      const button = screen.getByRole('button', { name: /خدماتنا/i });
      
      fireEvent.click(button);
      
      await waitFor(() => {
        const closeButton = screen.getByRole('button', { name: /إغلاق/i });
        expect(closeButton).toBeInTheDocument();
      });
    });

    it('should close bottom sheet when close button is clicked', async () => {
      render(<ServicesPopover locale="ar" isMobile />);
      const button = screen.getByRole('button', { name: /خدماتنا/i });
      
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
      
      const closeButton = screen.getByRole('button', { name: /إغلاق/i });
      fireEvent.click(closeButton);
      
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    it('should close bottom sheet when overlay is clicked', async () => {
      render(<ServicesPopover locale="ar" isMobile />);
      const button = screen.getByRole('button', { name: /خدماتنا/i });
      
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
      
      // Find and click overlay
      const overlay = document.querySelector('.fixed.inset-0.bg-black\\/50');
      if (overlay) {
        fireEvent.click(overlay);
      }
      
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper dialog role', async () => {
      render(<ServicesPopover locale="ar" />);
      const button = screen.getByRole('button', { name: /خدماتنا/i });
      
      fireEvent.click(button);
      
      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        expect(dialog).toHaveAttribute('aria-label', 'قائمة الخدمات');
      });
    });

    it('should be keyboard navigable', async () => {
      render(<ServicesPopover locale="ar" />);
      const button = screen.getByRole('button', { name: /خدماتنا/i });
      
      // Open with Enter
      button.focus();
      fireEvent.keyDown(button, { key: 'Enter' });
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
      
      // Close with Escape
      fireEvent.keyDown(document, { key: 'Escape' });
      
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });
  });

  describe('Localization', () => {
    it('should display English text when locale is en', () => {
      render(<ServicesPopover locale="en" />);
      const button = screen.getByRole('button', { name: /services/i });
      expect(button).toBeInTheDocument();
    });

    it('should display Arabic text when locale is ar', () => {
      render(<ServicesPopover locale="ar" />);
      const button = screen.getByRole('button', { name: /خدماتنا/i });
      expect(button).toBeInTheDocument();
    });
  });
});

// ============================================================================
// INTEGRATION TESTS
// ============================================================================

describe('ServicesPopover Integration', () => {
  it('should close when a service link is clicked', async () => {
    render(<ServicesPopover locale="ar" />);
    const button = screen.getByRole('button', { name: /خدماتنا/i });
    
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
    
    // Click on a service
    const serviceLink = screen.getByText('حجز موعد مع طبيب').closest('a');
    if (serviceLink) {
      fireEvent.click(serviceLink);
    }
    
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('should close when "View All Services" is clicked', async () => {
    render(<ServicesPopover locale="ar" />);
    const button = screen.getByRole('button', { name: /خدماتنا/i });
    
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
    
    // Click "View All Services"
    const viewAllLink = screen.getByText(/عرض جميع الخدمات/i).closest('a');
    if (viewAllLink) {
      fireEvent.click(viewAllLink);
    }
    
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});

// ============================================================================
// PERFORMANCE TESTS
// ============================================================================

describe('ServicesPopover Performance', () => {
  it('should render quickly', () => {
    const startTime = performance.now();
    render(<ServicesPopover locale="ar" />);
    const endTime = performance.now();
    
    const renderTime = endTime - startTime;
    expect(renderTime).toBeLessThan(100); // Should render in less than 100ms
  });

  it('should open popover quickly', async () => {
    render(<ServicesPopover locale="ar" />);
    const button = screen.getByRole('button', { name: /خدماتنا/i });
    
    const startTime = performance.now();
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
    
    const endTime = performance.now();
    const openTime = endTime - startTime;
    
    expect(openTime).toBeLessThan(300); // Should open in less than 300ms
  });
});
