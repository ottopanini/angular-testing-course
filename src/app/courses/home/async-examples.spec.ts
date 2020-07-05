import {fakeAsync, flush} from '@angular/core/testing';

describe('Async Testing Expamples', () => {

  it('Asynchronous test example with Jasmine done()', (done: DoneFn) => {
    let test = false;
    setTimeout(() => {
      console.log('running assertions');
      test = true;

      expect(test).toBeTruthy();
      done();
    }, 1000);
  });

  it('asynchronous test example - setTimeout()', fakeAsync(() => {
    let test = false;
    setTimeout(() => {
      console.log('running assertions sertTimeout()');
      test = true;
    }, 1000);

    flush();
    expect(test).toBeTruthy();
  }));

  it('Asynchronous test example - plain Promise', () => {
    let test = false;

    console.log('creating promise');
    setTimeout(() => {
      console.log('setTimeout() call triggered');
    });

    setTimeout(() => {
      console.log('setTimeout() second call triggered');
    });

    Promise.resolve().then(() => {
      console.log('Promise evaluated succesfully');

      return Promise.resolve();
    }).then(() => {
      console.log('second Promise evaluated succesfully');
      test = true;
    });

    console.log('running test assertion');
    expect(test).toBeTruthy();
  });
});
