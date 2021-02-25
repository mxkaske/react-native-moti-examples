import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

export default function AnimatedStyleUpdateExample() {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }} />
      <View style={s.container}>
        <Numbers value={Math.floor(value.getHours() / 8)} maxValue={3} />
        <Numbers value={value.getHours() % 10} maxValue={10} />
        <Numbers value={Math.floor(value.getMinutes() / 10)} maxValue={6} />
        <Numbers value={value.getMinutes() % 10} maxValue={10} />
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

const Numbers = ({ value, maxValue }: NumbersProps) => {
  return (
    <View style={[s.innerContainer, s.shadow]}>
      <View style={[s.circle, s.shadow]} />
      {Array(maxValue)
        .fill(0)
        .map((_, i) => {
          const active = i === value;
          return (
            <View style={s.numberContainer}>
              <Text key={i} style={[s.number, active && s.active]}>
                {i}
              </Text>
            </View>
          );
        })}
    </View>
  );
};

const SPACING = 8;
const DIAMETER = SPACING * 6;

const s = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  innerContainer: {
    backgroundColor: "#4B5563",
    borderRadius: DIAMETER / 2,
    marginHorizontal: SPACING,
  },
  numberContainer: {
    width: DIAMETER,
    height: DIAMETER,
    justifyContent: "center",
    alignItems: "center",
  },
  number: {
    color: "black",
  },
  active: {
    color: "white",
  },
  circle: {
    position: "absolute",
    alignSelf: "center",
    backgroundColor: "black",
    opacity: 0.4,
    width: DIAMETER,
    height: DIAMETER,
    borderRadius: DIAMETER / 2,
    transform: [{ scale: 1.2 }],
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
});
