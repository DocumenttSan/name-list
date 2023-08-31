import { useState } from "react";
import "./App.css";
import { Button, Label, TextInput } from "flowbite-react";
import { v4 } from "uuid";
import React from "react";

interface item {
  id: string;
  firstName: string;
  lastName: string;
  status: number;
}

export const NameList = () => {
  const [nameList, setNameList] = useState<item[]>([]);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [editFirstName, setEditFirstName] = useState<string>("");
  const [editLastName, setEditLastName] = useState<string>("");
  const [value, setValue] = useState<string>("");
  var [nameFind, setNameFind] = useState<item[]>([]);

  const addPerson = () => {
    const newNameList: item = {
      id: v4(),
      firstName: firstName,
      lastName: lastName,
      status: 1,
    };
    setNameList([...nameList, newNameList]);
    setFirstName("");
    setLastName("");
  };

  const editPerson = (index: number) => {
    nameList[index].status = 2;
    setEditFirstName(nameList[index].firstName);
    setEditLastName(nameList[index].lastName);
    setNameList([...nameList]);
  };

  const savePerson = (index: number) => {
    nameList[index].firstName = editFirstName;
    nameList[index].lastName = editLastName;
    nameList[index].status = 1;
    setNameList([...nameList]);
  };

  const removePerson = (index: number) => {
    nameList.splice(index, 1);
    setNameList([...nameList]);
  };

  const backEdit = (index: number) => {
    nameList[index].status = 1;
    setNameList([...nameList]);
  };

  const findName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    var textFind = event.target.value;
    if (textFind.length > 0) {
      const array = nameList.filter((nameList) => {
        return (
          nameList.firstName.includes(textFind) ||
          nameList.lastName.includes(textFind)
        );
      });
      setNameFind(array);
    } else {
      setNameFind([]);
    }
  };

  return (
    <div className="flex flex-row w-screen h-screen">
      <div className="flex flex-col basis-1/2 border-r-2 border-indigo-400 border-dashed justify-center items-center">
        <p>Add Name</p>
        <form>
          <div className="p-6 w-80 text-left">
            <Label>Firstname</Label>
            <TextInput
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="John"
            />
            <br />
            <Label>Lastname</Label>
            <TextInput
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Cena"
            />
          </div>
        </form>
        <Button size="lg" onClick={() => addPerson()} pill color="success">
          Save
        </Button>
      </div>
      <div className="flex flex-col basis-1/2 justify-center items-center">
        <p>Name List</p>
        <div>
          <label>Search </label>
          <TextInput value={value} onChange={findName} />
        </div>
        <div className="flex flex-row row-span-1">
          <ul className="space-y-5">
            {nameList.map((name: item, index: number) => {
              return name.status == 1 ? (
                <li key={name.id}>
                  <p className="text-base">
                    {index + 1} : Firstname[{name.firstName}] Lastname[
                    {name.lastName}]
                  </p>
                  <div className="flex space-x-3 m-2 justify-center">
                    <Button
                      color="warning"
                      onClick={() => editPerson(index)}
                      pill
                      className="inline-block"
                    >
                      Edit
                    </Button>
                    <Button
                      color="failure"
                      onClick={() => removePerson(index)}
                      pill
                      className="inline-block"
                    >
                      Remove
                    </Button>
                  </div>
                </li>
              ) : (
                <li key={name.id}>
                  <Label>Firstname</Label>
                  <TextInput
                    value={editFirstName}
                    // defaultValue={name.firstName}
                    onChange={(e) => setEditFirstName(e.target.value)}
                    placeholder="John"
                  />
                  <br />
                  <Label>Lastname</Label>
                  <TextInput
                    value={editLastName}
                    // defaultValue={name.lastName}
                    onChange={(e) => setEditLastName(e.target.value)}
                    placeholder="Cena"
                  />
                  <div className="flex space-x-3 m-2 justify-center">
                    <Button
                      onClick={() => savePerson(index)}
                      pill
                      color="success"
                      className="inline-block"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => backEdit(index)}
                      pill
                      className="inline-block"
                    >
                      Back
                    </Button>
                  </div>
                </li>
              );
            })}
            <li>Searched</li>
            {nameFind.map((name: item) => {
              return (
                <li key={name.id}>
                  <p className="text-base">
                    Firstname[{name.firstName}] Lastname[
                    {name.lastName}]
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
