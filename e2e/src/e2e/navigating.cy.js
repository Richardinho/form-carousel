describe('navigating back', () => {
  it('passes', () => {
    cy.visit('/');

    cy.get('[data-cy=input-firstName]').type('{selectAll}John');

    cy.get('[data-cy=input-lastName]').type('{selectAll}Smith');

    cy.get('[data-cy=select-job]').select('artist');

    cy.get('[data-cy=next-button-personal]').click();

    cy.get('[data-cy=select-color]').select('blue');

    cy.get('[data-cy=next-button-color]').click();

    // user selects exercise

    cy.get('[data-cy=radio-exercise-yes] input').check();

    // user clicks next
    cy.get('[data-cy=next-button-fitness]').click();

    // verify pushups value is no
    cy.get('[data-cy=radio-pushups-no] input').should('be.checked');
    // user selects yes to pushups
    cy.get('[data-cy=radio-pushups-yes] input').check();
    // user clicks prev
    cy.get('[data-cy=prev-button-exercise]').click();
    // user selects no exercise
    cy.get('[data-cy=radio-exercise-no] input').check();
    // user clicks next
    cy.get('[data-cy=next-button-fitness]').click();
    // verify on the tv page
    cy.get('[data-test=header]').contains('Television Programmes');
    // user clicks prev
    cy.get('[data-cy=prev-button-tv]').click();
    // user selects yes to exercise
    cy.get('[data-cy=radio-exercise-yes] input').check();
    cy.get('[data-cy=next-button-fitness]').click();
    // verify pushups value is no
    cy.get('[data-cy=radio-pushups-no] input').should('be.checked');
  });
});
