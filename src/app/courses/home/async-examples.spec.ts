import {fakeAsync, flush, flushMicrotasks, tick} from '@angular/core/testing';

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

  it('Asynchronous test example - plain Promise', fakeAsync(() => {
    let test = false;

    console.log('creating promise');

    Promise.resolve().then(() => {
      console.log('Promise evaluated succesfully');

      return Promise.resolve();
    }).then(() => {
      console.log('second Promise evaluated succesfully');
      test = true;
    });

    flushMicrotasks();

    console.log('running test assertion');
    expect(test).toBeTruthy();
  }));

  it('Asynchronous test example - Promises + setTimeout()', fakeAsync(() => {
    let counter = 0;

    Promise.resolve().then(() => {
      counter += 10;
      setTimeout(() => {
        counter += 1;
      }, 1000);
    });

    expect(counter).toBe(0);
    flushMicrotasks();
    expect(counter).toBe(10);
    tick(500);
    expect(counter).toBe(10);
    tick(500);
    expect(counter).toBe(11);
  }));
});
