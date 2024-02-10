import service from "./apiService";

export const AdminService = {
  editUser: async ( userid, userdata ) => {
    try {
      await service.patch("users", userid, userdata);
    } catch (error) {
      throw error;
    }
  },

  deleteUser: async (userid) =>{
    try{
      const response = await service.delete(`users/${userid}`);
      return response.data;
    }
    catch(error){
      throw error
    }
  }
};
