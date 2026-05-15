#pragma once

#include <string>
#include <map>
#include <vector>

namespace Aether {

class LSystem {
public:
    std::string Axiom;
    std::map<char, std::string> Rules;

    LSystem(const std::string& axiom) : Axiom(axiom) {}

    void AddRule(char symbol, const std::string& production) {
        Rules[symbol] = production;
    }

    std::string Expand(int iterations) {
        std::string current = Axiom;
        for (int i = 0; i < iterations; i++) {
            std::string next = "";
            for (char c : current) {
                if (Rules.count(c)) {
                    next += Rules[c];
                } else {
                    next += c;
                }
            }
            current = next;
        }
        return current;
    }
    
    // Species Presets
    static LSystem CreatePine() {
        LSystem pine("F");
        pine.AddRule('F', "F[-F]F[+F][F]"); // Simple branching pine
        return pine;
    }

    static LSystem CreateOak() {
        LSystem oak("X");
        oak.AddRule('X', "F[+X][-X]FX");
        oak.AddRule('F', "FF");
        return oak;
    }
};

} // namespace Aether
