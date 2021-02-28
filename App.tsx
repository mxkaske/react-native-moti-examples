import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { View as MotiView, Text as MotiText } from "moti";

const SIZE = 45;
const SPACING = 6;

export default function AnimatedStyleUpdateExample() {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#F3F4F6" }}>
      <View style={{ flex: 1 }} />
      <View style={s.container}>
        <Numbers value={Math.floor(value.getHours() / 10)} maxValue={3} />
        <Numbers value={value.getHours() % 10} maxValue={10} />
        <View style={{ width: SPACING * 2 }} />
        <Numbers value={Math.floor(value.getMinutes() / 10)} maxValue={6} />
        <Numbers value={value.getMinutes() % 10} maxValue={10} />
        <View style={{ width: SPACING * 2 }} />
        <Numbers value={Math.floor(value.getSeconds() / 10)} maxValue={6} />
        <Numbers value={value.getSeconds() % 10} maxValue={10} />
      </View>
    </View>
  );
}

interface NumbersProps {
  value: number;
  maxValue: number;
}

const Numbers = React.memo(({ value, maxValue }: NumbersProps) => {
  return (
    <View>
      <MotiView
        animate={{ translateY: -value * SIZE }}
        style={[s.innerContainer, s.shadow]}
        transition={{ type: "timing", duration: 300 }}
      >
        {Array(maxValue)
          .fill(0)
          .map((_, i) => {
            const active = i === value;
            return (
              <View key={i} style={s.numberContainer}>
                <MotiText
                  animate={{
                    scale: active ? 1.4 : 1,
                    // @ts-ignore
                    color: active ? "#FFFFFF" : "#9CA3AF",
                  }}
                  transition={{ type: "timing", duration: 300 }}
                >
                  {i}
                </MotiText>
              </View>
            );
          })}
      </MotiView>
      <MotiView
        style={[s.circle, s.shadow]}
        animate={{ scale: [0.6, 1.1] }}
        transition={{ type: "timing", duration: 150 }}
      />
    </View>
  );
});

const s = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  innerContainer: {
    backgroundColor: "#4B5563",
    borderRadius: SIZE / 2,
    marginHorizontal: SPACING,
  },
  numberContainer: {
    width: SIZE,
    height: SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    position: "absolute",
    alignSelf: "center",
    backgroundColor: "#1F2937",
    opacity: 0.3,
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
});
