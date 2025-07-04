const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");
const axios = require("axios");
const cheerio = require("cheerio");

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

//add a new product
const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

    console.log(averageReview, "averageReview");

    const newlyCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    });

    await newlyCreatedProduct.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//fetch all products

const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//edit a product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

    let findProduct = await Product.findById(id);
    if (!findProduct)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice =
      salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;
    findProduct.averageReview = averageReview || findProduct.averageReview;

    await findProduct.save();
    res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    res.status(200).json({
      success: true,
      message: "Product delete successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

// Import product details from a Flipkart product page URL and save as a new product
const importProductFromFlipkart = async (req, res) => {
  const { url } = req.body;

  if (!url || typeof url !== "string")
    return res.status(400).json({ success: false, message: "URL is required" });

  try {
    // Fetch the HTML of the page
    const { data: html } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123 Safari/537.36",
      },
    });

    // Load into cheerio for parsing
    const $ = cheerio.load(html);

    // Helper to safely get meta property
    const getMeta = (property) =>
      $(`meta[property='${property}']`).attr("content") || "";

    const title = getMeta("og:title") || $("span.B_NuCI").text().trim();
    const description = getMeta("og:description");
    const image = getMeta("og:image") || $("img._396cs4, img._2r_T1I").first().attr("src");
    const priceMeta = getMeta("product:price:amount");
    let price = 0;
    if (priceMeta) price = parseFloat(priceMeta);
    else {
      const priceText = $("div._30jeq3._16Jk6d").first().text();
      price = parseFloat(priceText.replace(/[^0-9.]/g, ""));
    }

    // Determine category based on keywords in title
    let category = "accessories";
    if (/mobile|smartphone/i.test(title)) category = "mobiles";
    else if (/laptop/i.test(title)) category = "laptops";
    else if (/earphone|headphone|speaker/i.test(title)) category = "audio";
    else if (/camera|dslr/i.test(title)) category = "cameras";

    // Determine brand simple heuristics
    const brandKeywords = ["apple", "samsung", "xiaomi", "oneplus", "sony"];
    let brand = brandKeywords.find((b) => new RegExp(b, "i").test(title));
    if (!brand) brand = "apple";

    // Prepare new product doc
    const newProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price: isNaN(price) ? 0 : price,
      salePrice: 0,
      totalStock: 100,
      averageReview: 0,
    });

    await newProduct.save();

    return res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to import product" });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
  importProductFromFlipkart,
};
