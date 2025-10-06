import { useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import FlashMessageComponent from "../../components/common/FlashMessageComponent";
import Header from "../../components/common/Header";
import FieldTreeTable from "../../components/FieldListPage/FieldAccordion";
import FieldCreate from "../../components/FieldListPage/FieldCreate";
import { Field } from "../../model/Field";
import { FlashMessage } from "../../model/FlashMessage";
import { ParentField } from "../../model/ParentField";
import handleAxiosError from "../../services/axiosErrorHandler";
import FieldService from "../../services/fieldService";

export default function JsonPage() {
  const data = useLoaderData() as { fields: Field[]; parentFields: ParentField[] };

  const [flashMessage, setFlashMessage] = useState<FlashMessage | null>(null);
  const [searchParams] = useSearchParams();
  const [fieldList, setFieldList] = useState<Field[]>(data.fields)
  const [parentFields, setParentFields] = useState(data.parentFields)
  const pathParam = searchParams.get("path");

  const fetchFieldList = () => {
    FieldService.getFieldsByPath(pathParam || "")
      .then((res) => {
        setFieldList(res)
        console.log("already updated:", res)
      })
      .catch((err) => setFlashMessage({ type: "danger", message: handleAxiosError(err) }));
  };

  const fetchParentFields = () => {
    FieldService.getParentFields(pathParam || "")
      .then((res) => {
        setParentFields(res)
      })
      .catch((err) => setFlashMessage({ type: "danger", message: handleAxiosError(err) }));
  }

  const handleCreateFieldClick = (selectedParent: string, target: Field) => {
    FieldService.createField(pathParam || "", selectedParent, target)
      .then(() => {
        setFlashMessage({ type: "success", message: `${target.key} created!` })
        fetchFieldList()
        fetchParentFields()
      })
      .catch((err) =>
        setFlashMessage({ type: "danger", message: handleAxiosError(err) })
      );
  }

  const handleDeleteFieldClick = (selectedParent: string, target: Field) => {
    FieldService.deleteField(pathParam || "", selectedParent, target)
      .then(() => {
        setFlashMessage({ type: "success", message: `${target.key} deleted!` })
        fetchFieldList()
      })
      .catch((err) =>
        setFlashMessage({ type: "danger", message: handleAxiosError(err) })
      );
  }

  return (
    <div className="container mt-5">
      <Header> File: {pathParam} </Header>
      <FlashMessageComponent message={flashMessage} onClose={() => setFlashMessage(null)} />
      <FieldCreate onClickCreate={handleCreateFieldClick} parentFieldList={parentFields} />
      <FieldTreeTable onClickDelete={handleDeleteFieldClick} fieldList={fieldList} />
    </div>
  )
}