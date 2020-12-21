import React from 'react';
import { Modal, StyleSheet } from 'react-native';

import WelcomeScreen from './Modals/WelcomeScreen';
import Camera from './Modals/Camera';
import Maps from './Modals/Maps';

import { ModalType } from '../enums/ModalType';

// TODO
const MODALS = {
  [ModalType.Welcome]: WelcomeScreen,
  [ModalType.Camera]: Camera,
  [ModalType.Maps]: Maps,
};

const RootModal = () => {
  const modalType = '';

  if (!modalType) return null;

  const ModalComponent = MODALS[modalType];

  return (
    <Modal>
      <ModalComponent {...modalProps} />
    </Modal>
  );
};

// const styles = StyleSheet.create({});
export default RootModal;
