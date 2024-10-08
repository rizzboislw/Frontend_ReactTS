import { useFilter } from "../../hooks/useDataFetch";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { default as viewIcon } from "../../../../assets/svg/view.svg";
import { useNavigate } from "react-router-dom";

function UserDisplaySection() {
  // access the data received from API fetching
  const { userData } = useFilter();
  // delcare the state and set the default view as grid view
  const [currentView, setCurrentView] = useState("grid");

  // use redirection, to allow user to click an item and redirecting them to a specificly rendered page
  const redirect = useNavigate();

  return (
    <div className="w-full h-max flex flex-col gap-4 mb-4">
      <div className="flex justify-between">
        <h3 className="text-2xl font-semibold flex items-center text-gray-500">
          SHOWING: {userData.length}
        </h3>
        <div>
          <Menu closeOnSelect={false} placement="bottom">
            <MenuButton as={Button} bgColor="#055894">
              <img src={viewIcon} alt="grid-view" />
            </MenuButton>
            <MenuList minWidth="30px">
              <MenuOptionGroup
                defaultValue={currentView}
                title="View"
                type="radio"
              >
                <MenuItemOption
                  value="grid"
                  onClick={() => setCurrentView("grid")}
                >
                  Grid
                </MenuItemOption>
                <MenuItemOption
                  value="list"
                  onClick={() => setCurrentView("list")}
                >
                  List
                </MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </div>
      </div>
      <div
        className={
          currentView === "grid"
            ? "w-full gap-4 grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))]"
            : "w-full gap-4 flex flex-col"
        }
      >
        {userData.length === 0 ? (
          <h3 className="text-xl text-bold flex item-center w-full ">
            Loading...
          </h3>
        ) : (
          userData.map((user, index) => (
            <div
              key={user.id}
              className="w-full h-max  flex flex-col items-start rounded-xl text-sm shadow-[0px_5px_15px_rgba(0,0,0,0.35)] p-4 bg-[#ffffff] text-[#055894] gap-1 hover:translate-y-[-5px] duration-200 hover:cursor-pointer"
              onClick={() => {
                redirect(`/u/${user.username}`);
              }}
            >
              <p>{index + 1}</p>
              <p className="font-semibold">
                Username: <span className="font-normal">{user.username}</span>
              </p>
              <p className="font-semibold">
                Name:
                <span className="font-normal"> {user.name}</span>
              </p>
              <p className="font-semibold">
                Age:
                <span className="font-normal"> {user.age}</span>
              </p>
              <p className="font-semibold">
                Gender:
                <span className="font-normal"> {user.gender}</span>
              </p>
              <p className="font-semibold">
                Email:
                <span className="font-normal"> {user.email}</span>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserDisplaySection;
