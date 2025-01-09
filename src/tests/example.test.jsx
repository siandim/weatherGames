import {describe,it,expect} from "vitest";
describe("examaple suite",()=> {
    it("should pass",() => {
        const sum = 2+2
        expect(sum).toEqual(4)
    })
})