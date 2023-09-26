import Test from "@/app/components/test";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Test", () => {

  it('should render component', () => {
    render(<Test/>)

    expect(screen.getByText('Test')).toBeInTheDocument()

  })
});