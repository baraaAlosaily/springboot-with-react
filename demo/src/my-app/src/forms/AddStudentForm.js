import React from 'react'
import { Formik } from 'formik'
import { Input,Button,Tag  } from 'antd'
import { addNewStudent } from '../Client';
const marginBottonStyle={marginBottom:"10px"};
const tagStyle={backgroundColor:'#f50',color:'white',...marginBottonStyle};

const AddStudentForm = (props) => {
  return (
    <Formik
      initialValues={{ firstName:'',lastName:'',email:'',gender:''}}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Email Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        if(!values.firstName){
            errors.firstName='First Name Required'
        }
        if(!values.lastName){
            errors.lastName='Last Name Required'
        }
        if(!values.gender){
            errors.gender='Gender Required'
        } else if(!['MALE','FEMALE','male','female'].includes(values.gender)){
            errors.gender='Gender must be Male or Female';
        }
        return errors;
      }}
      onSubmit={(student, { setSubmitting }) => {
          addNewStudent(student).then(()=>{
              alert(JSON.stringify(student))
              props.onSuccess();
              props.getAll();
          }).catch((err)=>{
              props.onFailure(err);
              setSubmitting(false);
          }).finally(()=>{
            student.lastName="";
            student.email="";
            student.firstName="";
            student.gender=""
            setSubmitting(false);
          })
 
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        submitForm,
        isValid
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          <Input
            style={marginBottonStyle}
            name="firstName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.firstName}
            placeholder="First Name E.g John"
          />
          {errors.firstName && touched.firstName && <Tag style={tagStyle}>{errors.firstName}</Tag>}
          <Input
            style={marginBottonStyle}

            name="lastName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.lastName}
            placeholder="Last Name E.g John"
          />
          {errors.lastName && touched.lastName && 
          <Tag style={tagStyle}>{errors.lastName}</Tag>}
          <Input
            style={marginBottonStyle}
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            placeholder="Email E.g example@gmail.com"
          />
          {errors.email && touched.email && 
          <Tag style={tagStyle}>{errors.email}</Tag>}
          <Input
            style={marginBottonStyle}
            name="gender"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.gender}
            placeholder="Gender E.g Male or Female"
          />
          {errors.gender && touched.gender && 
          <Tag style={tagStyle}>{errors.gender}</Tag>}

          <Button onClick={()=>{submitForm()}          
        } 
          type="submit" 
         
          disabled={isSubmitting| (touched&&!isValid)}>
            Submit
          </Button>
        </form>
      )}
    </Formik>
  )
}

export default AddStudentForm