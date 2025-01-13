import { userDB } from "../services/db/userDB.js";
import {
  addRepositories,
  removedRepositories,
} from "../services/repositories/add.repositories.js";

const webhooksHandler = async (body) => {
  try {
    if (body.action == "created") {
      let result = await userDB.update(
        {
          githubId: body.installation.account.id.toString(),
        },
        {
          installationId: body.installation.id,
          clientId: body.installation.client_id,
        }
      );
      if (!result) {
        result = await userDB.create({
          githubId: body.installation.account.id,
          installationId: body.installation.id,
          clientId: body.installation.client_id,
          username: body.installation.account.login,
          avatar: body.installation.account.avatar_url,
        });
      }
      addRepositories(body.repositories, {
        id: body.installation.account.id,
        senderId: body.sender.id,
      });
    } else if (body.action == "added") {
      let result = await addRepositories(body.repositories_added, {
        id: body.installation.account.id,
        senderId: body.sender.id,
      });
    } else if (body.action == "removed") {
      removedRepositories(body.repositories_removed);
    } else if (body.action == "deleted") {
      removedRepositories(body.repositories);
    } else {
      console.log("else", body);
    }
  } catch (error) {
    console.log(error);
  }
};

export default webhooksHandler;
