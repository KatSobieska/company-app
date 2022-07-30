const Employee = require("../employee.model.js");
const expect = require("chai").expect;
const mongoose = require("mongoose");

describe("Employee", () => {
  it("should throw an error if no arg provided", () => {
    const emp = new Employee({});

    emp.validate((err) => {
      expect(err.errors).to.exist;
    });
  });

  it("should throw an error if args are not a string", () => {
    const cases = [{}, []];
    for (let employee of cases) {
      const emp = new Employee({ employee });

      emp.validate((err) => {
        expect(err.errors).to.exist;
      });
    }
  });

  it("should throw an error when not all args were provided", () => {
    const cases = [
      { firstName: "John" },
      { lastName: "Doe" },
      { department: "IT" },
      { firstName: "John", department: "IT" },
    ];

    for (let employee of cases) {
      const emp = new Employee({ employee });

      emp.validate((err) => {
        expect(err.errors).to.exist;
      });
    }
  });

  it("should not throw an error if args are okay", () => {
    const cases = [
      { firstName: "John", lastName: "Doe", department: "IT" },
      { firstName: "Amanda", lastName: "Doe", department: "Marketing" },
    ];

    for (let employee of cases) {
      const emp = new Employee(employee);

      emp.validate((err) => {
        expect(err).to.not.exist;
      });
    }
  });
});
