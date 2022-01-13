import "jest";

function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

test('Ensure that the validateEmail() method does not allow invalid addresses.', () => {
    expect(validateEmail("")).toEqual(false);
    expect(validateEmail("@")).toEqual(false);
    expect(validateEmail("a@a")).toEqual(false);

    expect(validateEmail("test@star-shl.nl")).toEqual(true);
    expect(validateEmail("test@test.nl")).toEqual(true);
    expect(validateEmail("test@gmail.com")).toEqual(true);
});