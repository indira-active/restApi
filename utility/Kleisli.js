//general interface for piping promises and Callbacks together

class Kleisli {
  
    // given f :: x -> Monad y, constructs a category of type:
    // Cat (x ↣ y)
    constructor(f) {

        // this.run = f
        this.run = x => f(x)

    }

    // this :: Cat (x ↣ y)
    // Cat (y ↣ z) -> Cat (x ↣ z)
    pipe(category){

       return new Kleisli(x => this.run(x).then(category.run)) // then == bind
    }

    // utility functon:
    // this :: Cat (x ↣ y)
    // (y -> Monad z) -> Cat (x ↣ z)
    pipeTo(g){

        return new Kleisli(x => this.run(x).then(g)) // then == bind
    }

    // Monad => Cat (x ↣ x)
    //if your pipe is mixed between callback and promise add identity(Callback) at the beginning of the pipeline
    //to force the chain to type Callback from callback-monad.js remember this means you call run() twice
    static identity(monad){

        return new Kleisli(x => monad.resolve(x))
    }

    //(Cat, function) -> 
    //useful when using library that can curry functions and compose multiple functions together
    //remeber if composing that you still need to call run()
    static addPipeTo(pipeline, g){

        return pipeline.pipeTo(g)
    }
    static addPipe(pipeline, g){

        return pipeline.pipe(g)
    }
}

module.exports = Kleisli
