import crudController from '@/backend/controllers/crudController';
import * as schemaType from '@/backend/graphql/generated/schemaType';

import User from '@/backend/models/User';

function userController() {
  const methods = crudController<schemaType.User>(User);

  return {
    create: async (data: schemaType.User): Promise<schemaType.User> => {
      const args = { body: data };
      const newUser = await methods.create(args);
      if (!newUser) {
        throw new Error("Failed to create user");
      }
      return newUser;
    },
    search: methods.search,  // Expose the search method
    // Implement other methods as needed (like update, delete, etc.)
  };
}

export default userController;
