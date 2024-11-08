const express = require("express");
const mongoose = require("mongoose");
const ItemCategoryModel = require("../Models/ItemCategoryModel");


const AddCategory = async (req, res) => {
    try {
        const { categoryname, categorycode, email, mobile, address, description } = req.body;
        if (!categoryname || !categorycode || !email || !mobile || !address || !description) {
            return res.status(400).json({
                success: false,
                message: "all field are required"
            })
        }
        const ExitsCategory = await ItemCategoryModel.findOne({ email })
        if (ExitsCategory) {
            return res.status(404).json({
                success: false,
                message: "Category already exits"
            })
        };
        const NewAddCategory = new ItemCategoryModel({
            categoryname,
            categorycode,
            email,
            mobile,
            address,
            description
        });
        await NewAddCategory.save()

        return res.status(200).json({
            success: true,
            message: "Add category successfully",
            data: NewAddCategory
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to add category"
        })
    }
}

const GetAllCategory = async (req, res) => {
    try {
        const category = await ItemCategoryModel.find();
        if (!category) {
            return res.status(400).json({
                success: false,
                message: "Category are not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "successfully getAll Category",
            data: category
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unsuccessfully find allcategory"
        })
    }
}


const GetCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const Itemcategory = await ItemCategoryModel.findById(id)
        if (!Itemcategory) {
            return res.status(404).json({
                success: false,
                message: "unable to fetch category data"
            })
        };
        return res.status(200).json({
            success: false,
            message: "suuccefully fetch Category data",
            data: Itemcategory
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unsuccessfully find by Category"
        })
    }
}


const UpdateCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const CategoryData = await ItemCategoryModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!CategoryData) {
            return res.status(401).json({
                success: false,
                message: "Category is not found to update"
            })
        };
        return res.status(200).json({
            success: true,
            message: "Category update succssfully",
            data: CategoryData
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to update by Category"
        })
    }
}


const DeleteCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const Category = await ItemCategoryModel.findByIdAndDelete(id);
        if (!Category) {
            return res.status(401).json({
                success: false,
                message: "Category is not found to delete"
            })
        };
        return res.status(200).json({
            success: true,
            message: "Delete succssfully by category",
            data: Category
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unsuccessfully delete"
        })
    }
}


module.exports = {
    AddCategory,
    GetAllCategory,
    GetCategoryById,
    UpdateCategoryById,
    DeleteCategoryById
}