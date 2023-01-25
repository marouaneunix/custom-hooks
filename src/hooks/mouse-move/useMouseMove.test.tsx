import { fireEvent, render, screen } from "@testing-library/react"
import { useMouseMove } from "./useMouseMove";



const Target = () => {
  const {position, ref} = useMouseMove();
  
  return (
    <div data-testid="target" ref={ref}>
      {position && `${position.clientX}${position.clientY}`}
    </div>
  )
};

describe('useMouseMove hook', () => {
  it('should update position when mouse move', () => {
    render(<Target />);

    const target = screen.getByTestId('target');
    fireEvent.mouseMove(target,{clientX: 20, clientY: 23})

    expect(target).toHaveTextContent('2023');
  })
});