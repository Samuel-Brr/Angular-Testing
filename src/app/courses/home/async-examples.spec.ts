import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing"

fdescribe('Some examples', () => {

  it("Async test example - setTimeout()", fakeAsync(() => {

    let test = false;

    setTimeout(() => {

      console.log('Running assertion');

      test = true;

    }, 1000);

    flush()

    expect(test).toBeTruthy();

  }))

  it('Asyn test examp - plain Promise', fakeAsync(() => {

    let test = false;

    console.log("Creating promise");

    // setTimeout(() => {

    //   console.log('setTimeout() first callback trigered');

    // });

    // setTimeout(() => {

    //   console.log('setTimeout() second callback trigered');

    // });

    Promise.resolve().then(() => {

      console.log('Promise first then() evaluated successfully');

      return Promise.resolve();
    })
      .then(() => {

        console.log('Promise second then() evaluated successfully');

        test = true

      })

    flushMicrotasks();

    console.log('Running test assertions')

    expect(test).toBeTruthy();

  }))

  fit('Async example - Promises + setTimeout', fakeAsync(() => {

    let counter = 0;

    Promise.resolve()
      .then(() => {

        counter+=10;

        setTimeout(() => {

          counter +=1;

        }, 1000);
      })

    expect(counter).toBe(0);

    flushMicrotasks();

    expect(counter).toBe(10);

    flush();

    expect(counter).toBe(11);
  }))

} )
