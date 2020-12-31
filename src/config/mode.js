let base_URL;
if (process.env.NODE_ENV !== "production") {
  base_URL = "http://localhost:5000";
} else {
  base_URL = "https://eshopmzserver.herokuapp.com";
}

export default base_URL;
