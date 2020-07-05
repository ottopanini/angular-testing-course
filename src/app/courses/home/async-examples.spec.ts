describe('Async Testing Expamples', () => {

  it('Asynchronous test example with Jasmine done()', () => {
    let test = false;
    setTimeout((done: DoneFn) => {
      console.log('running assertions');
      test = true;

      expect(test).toBeTruthy();
      done();
    }, 1000);
  });
});
