import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import { Dialogs } from "../../ui/dialogs";
import { useForm } from "react-hook-form";
import { CategoryService } from "../../services/category-service";
import React from "react";

export const Add_Category = () => {
    const nav = useNavigate();
    
    // Separate useForm for each form
    const { register: registerCategory, handleSubmit: handleSubmitCategory, formState: { errors: errorsCategory } } = useForm({
        mode: "onChange",
    });
    const { register: registerCategories, handleSubmit: handleSubmitCategories, formState: { errors: errorsCategories } } = useForm({
        mode: "onChange",
    });
    const { register:updateCategory, handleSubmit: handleUpdateCategory, formState: { errors: errorsUpdateCategory } } = useForm({
        mode: "onChange",
    });
    const { register:deleteCategory, handleSubmit: handleDeleteCategory, formState: { errors: errorsDeleteCategory } } = useForm({
        mode: "onChange",
    });

    const onSubmit = async (data: any) => {
        try {
            console.log(data);
            const res = await CategoryService.addCategory(data);
            await Dialogs.success("Category has been added!");
            console.log(res);
        } catch (e) {
            console.log(e);
            Dialogs.error(e);
        }
    };

    const onSubmitCategories = async (data: any) => {
        try {
            console.log(data);
            if (data.categories!=null)
            {const res = await CategoryService.addCategoriesToASeries(data);
            await Dialogs.success("Categories have been added!");
            console.log(res);}
            
        } catch (e) {
            console.log(e);
            Dialogs.error(e);
        }
    };

    const onUpdateCategory= async (data: any) => {
        try {
            console.log(data);
            const res = await CategoryService.updateCategory(data);
            await Dialogs.success("Categories have been updated!");
            console.log(res);
        } catch (e) {
            console.log(e);
            Dialogs.error(e);
        }
    };

    const  onDeleteCategory = async (data: any) => {
        try {
            console.log(data);
            const res = await CategoryService.deleteCategory(data);
            console.log("response is :"+ JSON.stringify(res))
            console.log("response is :"+ res.deleted)
            if(res.deleted){await Dialogs.success(`Category ${data.id} have been updated!`);}
            else{await Dialogs.error(`Category ${data.id} doesnt exist`);}
          
        } catch (e) {
            console.log(e);
            Dialogs.error(e);
        }
    };
    return (
        <div className="signIn">
            <h1>Add A Category</h1>
            <form onSubmit={handleSubmitCategory(onSubmit)} noValidate>
                <div className="formItem">
                    <InputField register={registerCategory} errors={errorsCategory} name="name" type='text'  minLength={2} maxLength={30} required={true}/>
                </div>
                <div className="formItem">
                    <InputField register={registerCategory} errors={errorsCategory} name="description" type='text'  minLength={2} maxLength={255} required={true}/>
                </div>  
                <button type="submit" className='signInButton'>Add New Category</button>
            </form>

            <h1>Add Categories to a series.</h1>
            <form onSubmit={handleSubmitCategories(onSubmitCategories)} noValidate>
                <div className="formItem">
                    <InputField register={registerCategories} errors={errorsCategories} name="seriesId" type='text' minLength={1} />
                </div>
                <div className="formItem">
                    <InputField register={registerCategories} errors={errorsCategories} name="categories" type='text'  minLength={2} required={true} />
                </div>
                <button type="submit" className='signInButton'>Add Categories to Series</button>
            </form>


            <h1>Update A Category </h1>
            <form onSubmit={handleUpdateCategory(onUpdateCategory)} noValidate>
                <div className="formItem">
                    <InputField register={updateCategory} errors={errorsUpdateCategory} name="id" type='text' minLength={1} required={true} />
                </div>
                <div className="formItem">
                    <InputField register={updateCategory} errors={errorsUpdateCategory} name="name" type='text' minLength={2} maxLength={30} required={true} />
                </div>
                <div className="formItem">
                    <InputField register={updateCategory} errors={errorsUpdateCategory} name="description" type='text' minLength={2} maxLength={255} required={true}/>
                </div>
                <button type="submit" className='signInButton'>update  Category </button>
            </form>


            <h1>Delete A  Category </h1>
            <form onSubmit={handleDeleteCategory(onDeleteCategory)} noValidate>
                <div className="formItem">
                    <InputField register={deleteCategory} errors={errorsDeleteCategory} name="id" type='text' minLength={1} required={true}/>
                </div>
              
                <button type="submit" className='signInButton'>Delete A Category </button>
            </form>
            <button className='signInButton' onClick={() => nav("/Adding_Screen")}>Return</button>
        </div>
    );
}
