import { fakeAsync, flush, tick } from "@angular/core/testing"

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

  fit('Asyn test examp - plain Promise', () => {

    let test = false;

    console.log("Creating promise");

    setTimeout(() => {

      console.log('setTimeout() first callback trigered');

    });

    setTimeout(() => {

      console.log('setTimeout() second callback trigered');

    });

    Promise.resolve().then(() => {

      console.log('Promise first then() evaluated successfully');

      return Promise.resolve();
    })
      .then(() => {

        console.log('Promise second then() evaluated successfully');

        test = true

      })

    console.log('Running test assertions')

    expect(test).toBeTruthy();

  })

} )
