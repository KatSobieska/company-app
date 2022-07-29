const Department = require("../department.model.js");
const expect = require("chai").expect;
const mongoose = require("mongoose");

describe("Department", () => {
  it('should throw an errr if no "name" arg', () => {
    const dep = new Department({});

    dep.validate((err) => {
      expect(err.errors.name).to.exist;
    });
  });

  it('should throw an error if "name" is not a string', () => {
    const cases = [{}, []];
    for (let name of cases) {
      const dep = new Department({ name });

      dep.validate((err) => {
        expect(err.errors.name).to.exist;
      });
    }
  });

  it('should throw an error if "name: is too short or too long', () => {
    const cases = ["Abc", "abcd", "Lorem Ipsum, Lorem Ip"];
    for (let name of cases) {
      const dep = new Department({ name });

      dep.validate((err) => {
        expect(err.errors.name).to.exist;
      });
    }
  });

  it('should not throw an error if "name" is okay', () => {
    const cases = ["Managment", "Human Resources"];
    for (let name of cases) {
      const dep = new Department({ name });
      dep.validate((err) => {
        expect(err).to.not.exist;
      });
    }
  });
});
