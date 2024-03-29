// !STARTERCONF You should delete this page

import { render, screen } from '@testing-library/react';

import HomeGallery from '@/app/dashboard/components/HomeGallery';

describe('DashboardPage', () => {
  it('renders the Components', () => {
    render(<HomeGallery />);

    const heading = screen.getByText(/สร้างแผนสุขภาพเฉพาะบุคคล/i);

    expect(heading).toBeInTheDocument();
  });
});
