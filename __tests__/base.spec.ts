import { evaluate, BinaryOperation, BinaryOperators } from "../src";
const _setTimeout = window.setTimeout;

const continouslyAdvanceTimers = () => {
    let isCancelled = false;

    const advance = async () => {
        while (!isCancelled) {
            jest.runOnlyPendingTimers();
            await new Promise( resolve => _setTimeout(resolve) );
        }
    };

    advance();
    return () => {
        isCancelled = true;
    }    
};

describe('Sample Test', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    it('timing', async () => { 
        const shouldResolve = Promise.resolve()
            .then(() => console.log('before-promise'))
            .then(() => new Promise(r => setTimeout(r, 20)))
            .then(() => console.log('after-promise'))

        setTimeout(() => console.log('timer'), 100);
        const cancelAdvance = continouslyAdvanceTimers();
        await shouldResolve;
        cancelAdvance();
        console.log('end');
    });
});

describe("Simple expression tests", () => {
    test("Check literal value", () => {
        expect(evaluate({ type: "literal", value: 5 })).toBeCloseTo(5);
    });
    test("Check addition", () => {
        let expr = bin("+", 5, 10);
        expect(evaluate(expr)).toBeCloseTo(15);
    });
    test("Check subtraction", () => {
        let expr = bin("-", 5, 10);
        expect(evaluate(expr)).toBeCloseTo(-5);
    });
    test("Check multiplication", () => {
        let expr = bin("*", 5, 10);
        expect(evaluate(expr)).toBeCloseTo(50);
    });
    test("Check division", () => {
        let expr = bin("/", 10, 5);
        expect(evaluate(expr)).toBeCloseTo(2);
    });
});

function bin(op: BinaryOperators, x: number, y: number): BinaryOperation {
    return {
        type: "binary",
        operator: op,
        left: { type: "literal", value: x },
        right: { type: "literal", value: y },
    };
}
