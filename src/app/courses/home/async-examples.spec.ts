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

} )
