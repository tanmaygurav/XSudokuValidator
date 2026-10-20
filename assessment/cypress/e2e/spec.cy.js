describe("Sudoku Validator App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173"); // change to your app URL
  });
  
  it("UI renders: Title", () => {
    cy.contains("Sudoku Validator").should("be.visible");
  });

  it("UI renders: Description", () => {
    cy.contains("Enter numbers 1-9 and validate the board.").should("be.visible");
  });

  it("UI renders: board & cells", () => {
    cy.get(".board").should("be.visible");
    cy.get(".cell").should("be.visible");
  });
  
  it("UI renders: buttons", () => {
    cy.contains("Validate").should("be.visible");
    cy.contains("Clear").should("be.visible");
  });
});

