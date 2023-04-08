import { fireEvent, render, screen } from "@testing-library/react"
import { useLocationHash } from ".";
import { ChangeEvent } from "react";



const Target = () => {
    const {hash, updateHash: setHash} = useLocationHash();

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        
        setHash(e.target.value);
    }

    return (
        <>
            <div data-testid="target">
                {hash}   
            </div>
            <input value={hash} onChange={handleChange} aria-label="hash-input" />
        </>
    )
}

const setup = () => {
    const utils = render(<Target />)
    const input = screen.getByLabelText('hash-input')
    return {
        input,
        ...utils,
    }
}


describe('useLocationHash hook', () => {
    it('should get the window location hash', () => {
        window.location.hash = '#my-hash';
        setup();

        expect(screen.getByTestId('target')).toHaveTextContent('my-hash');
    })

    it('should update the window location hash', () => {
        window.location.hash = '';
        const {input} = setup();

        fireEvent.change(input, {target: {value: 'custom-hash'}})
        expect(screen.getByTestId('target')).toHaveTextContent('custom-hash');
    })
})