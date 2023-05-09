import Employee from "../models/employeeModel.js";

export const homePage = (req, res) => {
  res.send("On / Page");
};

export const getAllEmployees = async (req, res) => {
  try {
    const allEmployees = await Employee.find({});
    res.status(200).json(allEmployees);
  } catch (error) {
    console.log("Error while fetching all employees " + error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getParticularEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    res.status(200).json(employee);
  } catch (error) {
    console.log("Error while fetching employee " + error.message);
    res.status(500).json({ message: error.message });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(200).json(employee);
  } catch (error) {
    console.log("Error While Sending Data " + error.message);
    res.status(500).json({ message: error.message });
  }
  // console.log(req.body);
  // res.send(req.body);
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body);
    if (!updatedEmployee) {
      return res
        .status(404)
        .json({ message: `Employee Not Found with Id ${id} ` });
    }
    const newEmployee = await Employee.findByIdAndUpdate(id);
    res.status(200).json(newEmployee);
  } catch (error) {
    console.log("Error While Updating the Data " + error.message);
    res.status(500).json({ message: error.message });
  }
};

export const deleteEmployee = async (req,res)=>{
    try {
      const {id} = req.params;
      const deletedEmployee = await Employee.findByIdAndDelete(id);
      if(!deletedEmployee){
        return res.status(404).json({message:`Employee Not Found with Id ${id} `})
      }
      res.status(200).json(deletedEmployee);    
    } catch (error) {
      console.log("Error While Deleting the Employee "+ error.message);
      res.status(500).json({message:error.message});
    }
  }