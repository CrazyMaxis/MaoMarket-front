import { SizeType } from 'antd/es/config-provider/SizeContext';
import { createSlice } from '@reduxjs/toolkit';

export interface IAntdState {
  isDisabledAntd: boolean | undefined;
  sizeAntd: SizeType;
}

export const antdSlice = createSlice({
  name: 'antd',
  initialState: {
    isDisabledAntd: false,
    sizeAntd: undefined,
  } as IAntdState,
  reducers: {
    setIsDisabledAntd: (state, action) => {
      state.isDisabledAntd = action.payload;
    },
    setSizeAntd: (state, action) => {
      state.sizeAntd = action.payload;
    },
  },
});

export const { setIsDisabledAntd, setSizeAntd } = antdSlice.actions;

export default antdSlice.reducer;
