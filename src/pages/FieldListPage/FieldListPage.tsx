import { useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import FlashMessageComponent from "../../components/common/FlashMessageComponent";
import Header from "../../components/common/Header";
import FieldTreeTable from "../../components/FieldListPage/FieldAccordion";
import FieldCreate from "../../components/FieldListPage/FieldCreate";
import { Field } from "../../model/Field";
import { FlashMessage } from "../../model/FlashMessage";
import { ParentField } from "../../model/ParentField";

export default function JsonPage() {
  const [flashMessage, setFlashMessage] = useState<FlashMessage | null>(null);

  const [searchParams] = useSearchParams();
  const pathParam = searchParams.get("path");

  const data = useLoaderData() as { fields: Field[]; parentFields: ParentField[] };
  console.log(data)

  const createFile = (newField: Field) => {
    console.log("createFiled", { newField })
  }

  return (
    <div className="container mt-5">
      <Header> File: {pathParam} </Header>
      <FlashMessageComponent message={flashMessage} onClose={() => setFlashMessage(null)} />
      <FieldCreate onCreate={createFile} data={data} />
      <FieldTreeTable data={data.fields} />
    </div>
  )
}