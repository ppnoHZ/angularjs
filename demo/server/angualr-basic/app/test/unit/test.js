
function reverse(name) {
    return name.split("").reverse().join("");
}

describe('Person', function () {

    var Person;
    beforeEach(module('app'));
    beforeEach(inject(function (_Person_) {
        Person = _Person_;
    }));

    describe('Constructor', function () {
        it('assigns a name', function () {
            expect(new Person('Ben').hasOwnProperty('name', 'Ben'));
        });
        it("reverse word", function () {
            expect("DCBA").toEqual(reverse("ABCD"));
            expect("Conan").toEqual(reverse("nano"));
        });

    });
    it("reverse word", function () {
        expect("DCBA").toEqual(reverse("ABCD"));
        expect("Conan").toEqual(reverse("nano"));
    });



});