// 8 nights of Hanukkah 2016 Examples
// Night 6: k-Nearest-Neighbor Demo
// https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm
// Daniel Shiffman
// http://codingrainbow.com/

// Using Collections.sort to sort ArrayList
import java.util.*;

// What is k
int k = 0;

// Load all the data
Table data;

void setup() {
  size(400, 400);
  pixelDensity(2);
  // Data is the classic "Iris Data Set"
  // https://archive.ics.uci.edu/ml/datasets/Iris
  data = loadTable("iris.csv", "header");
  frameRate(1);
}

void draw() {
  background(0);
  
  // Increase k
  k++;
  if (k >= 8) {
    noLoop(); 
  }
  
  // Normalize all the data between 0 and 1
  // Not really necessary for Iris dataset, but good to demo
  for (int i = 0; i < 4; i++) {
    FloatList all = data.getFloatList(i);
    float mn = all.min();
    float mx = all.max();
    for (TableRow row : data.rows()) {
      float val = row.getFloat(i);
      row.setFloat(i, map(val, mn, mx, 0, 1));
    }
  }
  
  // Classify every possible spot in 2D space
  for (float x = 0; x < width; x+=4) {
    for (float y = 0; y < height; y+=4) {
      float xval = x / width;
      float yval = y / height;

      // List of all neighbors by distance
      ArrayList<Neighbor> neighbors = new ArrayList<Neighbor>();
      for (TableRow row : data.rows()) {
        float sx = row.getFloat("swidth");
        float sy = row.getFloat("slength");
        // For demo purposes I'm only using 2 properties of the dataset
        float d = dist(xval, yval, sx, sy);
        neighbors.add(new Neighbor(d, row.getString("class")));
      }
      
      // Fancy Java way to sort Array with an anonymous inner class thingie
      Collections.sort(neighbors, new Comparator<Neighbor>() {
        public int compare(Neighbor nb1, Neighbor nb2) {
          float diff = nb2.d - nb1.d;
          if (diff < 0) {
            return 1;
          } else if (diff > 0) {
            return -1;
          } else {
            return 0;
          }
        }
      }
      );

      
      // In the top k spots, how many neighbors per category
      IntDict knn = new IntDict();
      for (int i = 0; i < k; i++) {
        Neighbor nb = neighbors.get(i);
        if (knn.hasKey(nb.cat)) {
          knn.increment(nb.cat);
        } else {
          knn.set(nb.cat, 1);
        }
      }
      
      // Sort by number
      knn.sortValuesReverse();
      // Which one wins?
      String cat = knn.key(0);
      
      // Draw rectangle for this spot
      if (cat.equals("Iris-setosa")) {
        fill(255, 255, 0, 200);
      } else if (cat.equals("Iris-versicolor")) {
        fill(0, 255, 255, 200);
      } else {
        fill(255, 0, 255, 200);
      }
      noStroke();
      rect(x, y, 4, 4);
    }
  }
  
  // Show the original data
  for (TableRow row : data.rows()) {
    float x = row.getFloat("swidth");
    float y = row.getFloat("slength");
    String cat = row.getString("class");
    if (cat.equals("Iris-setosa")) {
      fill(255, 255, 0);
    } else if (cat.equals("Iris-versicolor")) {
      fill(0, 255, 255);
    } else {
      fill(255, 0, 255);
    }
    noStroke();
    ellipse(x*width, y*height, 8, 8);
  }
   
  // Display the k
  textSize(32);
  textAlign(RIGHT);
  fill(255);
  text("k: " + k, width-10, height-10);
}

// Simple object to just match a category with a distance
class Neighbor {
  float d;
  String cat;

  Neighbor(float d_, String cat_) {
    d = d_;
    cat = cat_;
  }
}