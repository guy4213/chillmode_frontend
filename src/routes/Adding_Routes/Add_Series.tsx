import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../../components/InputField"
import { Dialogs } from "../../ui/dialogs";
import { useNavigate } from "react-router-dom";
import { SeriesService } from "../../services/series-service";

export const Add_Series = () => {
    const nav = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onChange",
      });
      const { register: updateSeries, handleSubmit: handleUpdateSeries, formState: { errors: errorsUpdateSeries } } = useForm({
        mode: "onChange",
    });
    const { register: deleteSeries, handleSubmit: handleDeleteSeries, formState: { errors: errorsDeleteSeries } } = useForm({
      mode: "onChange",
  });
      const onSubmit = async (data:any) => {
        try {
        console.log(data)

          const res= SeriesService.addSeries(data)
          console.log("response is :"+ JSON.stringify(res))
          await Dialogs.success("Series Has been Added!");
          
        } catch (e) {
          console.log(e);
          Dialogs.error(e);
        }
      };
      const onUpdateSeries = async (data:any) => {
        try {
        console.log(data)

        const res=await SeriesService.updateSeries(data)
        console.log("response is :"+ JSON.stringify(res))
        
          await Dialogs.success(`Series ${data.id} has been Updated!`);
          
        } catch (e) {
          console.log(e);
          Dialogs.error(e);
        }
      };
      const onDeleteSeries= async (data:any) => {
        try {
        console.log(data)

        const res=await SeriesService.deleteSeries(data)
        console.log("response is :"+ JSON.stringify(res))
        console.log("response is :"+ res.deleted)
        if(res.deleted==true){ await Dialogs.success(`Series ${data.id} has been DELETED`);}
         else{await Dialogs.error(`Series ${data.id} does not exist.`);}
         
         //only if the user types any char thats diffrent than a digit.
        } catch (e) {
          console.log(e);
          Dialogs.error(e);
        }
      };
  return (
    <div className="signIn">
    <h1>Add A series</h1>
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="formItem">
        <InputField register={register} errors={errors} name="seriesName" type='text' minLength={1} maxLength={30}  required={true}/>
      </div>
      <div className="formItem">
        <InputField register={register} errors={errors} name="img" type='text'   required={true}  />
      </div> 
    
      <div className="formItem">
        <InputField register={register} errors={errors} name="publishedYear" type='text'  required={true}/>
    
      </div>    
        <div className="formItem">
        <InputField register={register} errors={errors} name="trailer" type='text' required={true} />
      </div>
      <div className="formItem">
        <InputField register={register} errors={errors} name="numberOfEpisodes" type='text' minLength={1}  required={true}/>
      </div>
      <div className="formItem">
        <InputField register={register} errors={errors} name="seriesDescription" type='text' required={true} />
      </div>
      
      <button type="submit" className='signInButton'>Add New Series</button>
    
    </form>




    <h1>Update A series</h1>
    <form onSubmit={handleUpdateSeries(onUpdateSeries)} noValidate>
    <div className="formItem">
        <InputField register={updateSeries} errors={errorsUpdateSeries} name="id" type='text' required={true} minLength={1} />
      </div>
      <div className="formItem">
        <InputField register={updateSeries} errors={errorsUpdateSeries} name="seriesName" type='text' />
      </div>
      <div className="formItem">
        <InputField register={updateSeries} errors={errorsUpdateSeries} name="img" type='text' />
      </div> 
    
      <div className="formItem">
        <InputField register={updateSeries} errors={errorsUpdateSeries} name="publishedYear" type='text'  />
    
      </div>    
        <div className="formItem">
        <InputField register={updateSeries} errors={errorsUpdateSeries} name="trailer" type='text'  />
      </div>
      <div className="formItem">
        <InputField register={updateSeries} errors={errorsUpdateSeries} name="numberOfEpisodes" type='text' />
      </div>
      <div className="formItem">
        <InputField register={updateSeries} errors={errorsUpdateSeries} name="seriesDescription" type='text' />
      </div>
      
      <button type="submit" className='signInButton'>Update Series</button>
    
    </form>



    <h1>Delete A series</h1>
    <form onSubmit={handleDeleteSeries(onDeleteSeries)} noValidate>
    <div className="formItem">
        <InputField register={deleteSeries} errors={errorsDeleteSeries} name="id" type='text' required={true} minLength={1} />
      </div>
      
      
      <button type="submit" className='signInButton'>Delete  Series</button>
    
    </form>
    <button className='signInButton' onClick={() => nav("/Adding_Screen")}>Return</button>
  </div>
  )
}
