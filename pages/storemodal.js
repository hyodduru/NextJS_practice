import React from "react";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Modal } from "antd";

import modal from "../styles/modal.module.css";

import { BASE_URL } from "../config";

const StoreModal = () => {
  const router = useRouter();
  const { id } = router.query;

  const closeModal = () => {
    router.replace("/");
  };

  const { data } = useSWR(id ? `${BASE_URL}/stores/${id}` : null);

  return (
    <Modal
      width="1000px"
      className={modal.modal}
      visible={!!id}
      onCancel={closeModal}
      centered
      maskClosable={false}
      footer={null}
    >
      <div className={modal.contents}>
        <Image
          src={data?.image || "/image/default.png"}
          alt="main"
          width="400"
          height="640"
        />
        <div className={modal.info}>
          <h1 className={modal.title}> {data?.name.toUpperCase()}</h1>
          <div className={modal.description}>{data?.description}</div>
          {data?.url && (
            <Link href={data.url} passHref>
              <a
                className={modal.url}
                target="_blank "
                rel="noreferrer noopener"
              >
                <div>
                  {data.url}
                  <div>매장 위치 보기</div>
                </div>
              </a>
            </Link>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default StoreModal;
