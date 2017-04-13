// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

function setup() {
  noCanvas();
  console.log('hello keras');

  var model = new KerasJS.Model({
    filepaths: {
      model: 'model/model.json',
      weights: 'model/model_weights.buf',
      metadata: 'model/model_metadata.json'
    },
    gpu: true
  });

}
