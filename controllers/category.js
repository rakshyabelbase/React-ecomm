import Category from "../models/category.js";
import slugify from "slugify";
import category from "../models/category.js";
import product from "../models/product.js";

export const create = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name.trim()) {
      return res.json({ error: "Name is required" });
    }
    const existingCategory = await category.findOne({ name });
    if (existingCategory) {
      return res.json({ error: "Already exist" });
    }

    const newCategory = await new Category({
      name,
      slug: slugify(name),
    }).save();
    res.json(newCategory);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

export const update = async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;
    const category = await Category.findByIdAndUpdate(
      categoryId,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );
    res.json(category);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};
export const remove = async (req, res) => {
  try {
    const removed = await Category.findByIdAndDelete(req.params.categoryId);
    res.json(removed);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};
export const list = async (req, res) => {
  try {
    const all = await Category.find({});
    res.json(all);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};
export const read = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    res.json(category);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};
export const productByCtaegory = async(req,res)=>{
      try{
        const category = await Category.findOne({slug: req.params.slug});
        const products = await product.find({category}).populate('category');

        res.json({
          category,
          products,
        })
      }catch(err){
        console.log(err);
      }
}
