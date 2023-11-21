function validate(data) {
    if (!data.get("name").trim()) {
        return [false , "Please enter a name"];
    }
    if (!data.get("category").trim()) {
        return [false , "Please select a category"];
    }
    if (!data.get("subCategory")) {
        return [false , "Please select a sub category"];
    }
    if (!data.get("description").trim()) {
        [false , "Please enter a description"];
    }
    if (data.get("previousPrice") === "0") {
        return [false , "previous price cannot be 0"];
    }
    if (data.get("currentPrice") === "0") {
        return [false , "current price cannot be 0"];
    }
    if (data.get("currentPrice") == null) {
        return [false , "Please enter a current price"];
    }
    
    if (data.get("image").size === 0) {
        return [false , "Please select an image"];
    }
    return [true];
}

export default validate