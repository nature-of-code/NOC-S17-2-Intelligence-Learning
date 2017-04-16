PImage img;
int w = 120;

// It's possible to convolve the image with many different 
// matrices to produce different effects. This is a high-pass 
// filter; it accentuates the edges. 
float[][] filter = { { -1, -1, -1 }, 
  { -1, 9, -1 }, 
  { -1, -1, -1 } }; 

void setup() {
  size(512, 512);
  img = loadImage("kitten.jpg");
  
  randomSeed(2);
  for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
      filter[i][j] = random(-1, 1);
    }
  }

  void draw() {
    // We're only going to process a portion of the image
    // so let's set the whole image as the background first
    image(img, 0, 0);

    // Calculate the small rectangle we will process
    int xstart = constrain(mouseX - w/2, 0, img.width);
    int ystart = constrain(mouseY - w/2, 0, img.height);
    int xend = constrain(mouseX + w/2, 0, img.width);
    int yend = constrain(mouseY + w/2, 0, img.height);
    int filtersize = 3;
    loadPixels();
    // Begin our loop for every pixel in the smaller image
    for (int x = xstart; x < xend; x++) {
      for (int y = ystart; y < yend; y++ ) {
        color c = convolution(x, y, filter, filtersize, img);
        int loc = x + y*img.width;
        pixels[loc] = c;
      }
    }
    updatePixels();

    stroke(0);
    noFill();
    rectMode(CORNERS);
    rect(xstart, ystart, xend, yend);
  }

  color convolution(int x, int y, float[][] filter, int filtersize, PImage img)
  {
    float rtotal = 0.0;
    float gtotal = 0.0;
    float btotal = 0.0;
    int offset = filtersize / 2;
    for (int i = 0; i < filtersize; i++) {
      for (int j= 0; j < filtersize; j++) {
        // What pixel are we testing
        int xloc = x+i-offset;
        int yloc = y+j-offset;
        int loc = xloc + img.width*yloc;
        // Make sure we haven't walked off our image, we could do better here
        loc = constrain(loc, 0, img.pixels.length-1);
        // Calculate the convolution
        rtotal += (red(img.pixels[loc]) * filter[i][j]);
        gtotal += (green(img.pixels[loc]) * filter[i][j]);
        btotal += (blue(img.pixels[loc]) * filter[i][j]);
      }
    }
    // Make sure RGB is within range
    rtotal = constrain(rtotal, 0, 255);
    gtotal = constrain(gtotal, 0, 255);
    btotal = constrain(btotal, 0, 255);
    // Return the resulting color
    return color(rtotal, gtotal, btotal);
  }