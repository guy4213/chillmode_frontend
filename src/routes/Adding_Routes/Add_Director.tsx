import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import { Dialogs } from "../../ui/dialogs";
import { useForm } from "react-hook-form";
import { DirectorService } from "../../services/director-service";
import React from "react";

export const Add_Director = () => {
    const nav = useNavigate();
    // Separate useForm for each form
    const { register: registerDirector, handleSubmit: handleSubmitDirector, formState: { errors: errorsDirector } } = useForm({
        mode: "onChange",
    });
    const { register: registerDirectors, handleSubmit: handleSubmitDirectors, formState: { errors: errorsDirectors } } = useForm({
        mode: "onChange",
    });
    const { register: updateDirector, handleSubmit: handleUpdateDirector, formState: { errors: errorsUpdateDirector} } = useForm({
        mode: "onChange",
    });
    const { register: deleteDirector, handleSubmit: handleDeleteDirector, formState: { errors: errorsDeleteDirector} } = useForm({
        mode: "onChange",
    });
  
    const onSubmit = async (data: any) => {
        try {
            console.log(data);
            const res = await DirectorService.addDirector(data);
            await Dialogs.success("Director has been added!");
            console.log(res);
        } catch (e) {
            console.log(e);
            Dialogs.error(e);
        }
    };
  
    const onSubmitDirectors = async (data: any) => {
        try {
            console.log(data);
            const res = await DirectorService.addDirectorsToASeries(data);
            await Dialogs.success("Directors have been added!");
            console.log(res);
        } catch (e) {
            console.log(e);
            Dialogs.error(e);
        }
    };
    const onUpdateDirector = async (data: any) => {
        try {
            console.log(data);
            const res = await DirectorService.updateDirector(data);
            await Dialogs.success(`Director ${data.id} has been updated`);
            console.log(res);
        } catch (e) {
            console.log(e);
            Dialogs.error(e);
        }
    };

  const  onDeleteDirector = async (data: any) => {
    try {
        console.log(data);
        const res = await DirectorService.deleteDirector(data);
        console.log("response is :"+ JSON.stringify(res))
        console.log("response is :"+ res.deleted)
        if(res.deleted){await Dialogs.success(`Director ${data.id} have been updated!`);}
        else{await Dialogs.error(`Director ${data.id} doesnt exist`);}
    } catch (e) {
        console.log(e);
        Dialogs.error(e);
    }
};
  
    return (
        <div className="signIn">
            <h1>Add Director</h1>
            <form onSubmit={handleSubmitDirector(onSubmit)} noValidate>
                <div className="formItem">
                    <InputField register={registerDirector} errors={errorsDirector} name="directorName" type='text' minLength={2} maxLength={30}  required={true} />
                </div>
                <div className="formItem">
                    <InputField register={registerDirector} errors={errorsDirector} name="country" type='text' minLength={2} maxLength={30}  required={true} />
                </div> 
                <div className="formItem">
                    <InputField register={registerDirector} errors={errorsDirector} name="city" type='text' minLength={2} maxLength={30}  required={true} />
                </div> 
 
                 
                <button type="submit" className='signInButton'>Add New Director</button>
            </form>
  
            <h1>Add Directors to a series.</h1>
            <form onSubmit={handleSubmitDirectors(onSubmitDirectors)} noValidate>
                <div className="formItem">
                    <InputField register={registerDirectors} errors={errorsDirectors} name="seriesId" type='text' minLength={1} />
                </div>
                <div className="formItem">
                    <InputField register={registerDirectors} errors={errorsDirectors} name="directorName" type='text' minLength={1}   required={true} />
                </div>
                <button type="submit" className='signInButton'>Add Director to a Series</button>
            </form>
  
            <h1>Update Director</h1>
            <form onSubmit={handleUpdateDirector(onUpdateDirector)} noValidate>
            <div className="formItem">
                    <InputField register={updateDirector} errors={errorsUpdateDirector} name="id" type='text'  minLength={1} required={true}/>
                </div>
                <div className="formItem">
                    <InputField register={updateDirector} errors={errorsUpdateDirector} name="directorName" type='text'  />
                </div>
                <div className="formItem">
                    <InputField register={updateDirector} errors={errorsUpdateDirector} name="country" type='text' />
                </div> 
                <div className="formItem">
                    <InputField register={updateDirector} errors={errorsUpdateDirector} name="city" type='text' />
                </div> 
 
                 
                <button type="submit" className='signInButton'>Update A Director</button>
            </form>

            <h1>Delete Director</h1>
            <form onSubmit={handleDeleteDirector(onDeleteDirector)} noValidate>
            <div className="formItem">
                    <InputField register={deleteDirector} errors={errorsDeleteDirector} name="id" type='text' required={true} minLength={1} />
                </div>
                
 
                 
                <button type="submit" className='signInButton'>Delete A Director</button>
            </form>
            <button className='signInButton' onClick={() => nav("/Adding_Screen")}>Return</button>
        </div>
    );
  }
  
