import { fireEvent, render, screen } from "@testing-library/react"

import { useKeydownOnTextArea } from "."


const Target = () => {
    const {code, ref} = useKeydownOnTextArea();

    return (
        <div>
            <textarea data-testid="target" ref={ref} />
            <span data-testid="result">{code && `${code}`}</span>
        </div>
        
    )
}


describe('useKeyClick hook', () => {
    it('should key code when keydown', () => {
        render(<Target />);

        const target = screen.getByTestId('target');
        fireEvent.keyDown(target, { key: "Enter", code: 13, charCode: 13 });

        expect(screen.getByTestId('result')).toHaveTextContent('13');
    })
})